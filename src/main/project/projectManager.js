const path = require('path')
const fs = require('fs')
const os = require('os')

function createProject(config) {
  const { projectPath, modId, modName, modVersion, author, description, packageName } = config
  
  if (!projectPath || !modId) {
    return { success: false, error: '项目路径和模组ID不能为空' }
  }

  if (!/^[a-z][a-z0-9_]*$/.test(modId)) {
    return { success: false, error: '模组ID必须以小写字母开头，只能包含小写字母、数字和下划线' }
  }

  if (fs.existsSync(projectPath)) {
    const files = fs.readdirSync(projectPath)
    if (files.length > 0) {
      return { success: false, error: '项目目录已存在且不为空' }
    }
  } else {
    fs.mkdirSync(projectPath, { recursive: true })
  }

  const packageDir = (packageName || 'com.' + author + '.' + modId).replace(/\./g, '/')
  
  const structure = generateForgeStructure({
    projectPath,
    modId,
    modName: modName || modId,
    modVersion: modVersion || '1.0.0',
    author: author || 'Author',
    description: description || 'A Minecraft Forge mod',
    packageName: packageName || 'com.' + author + '.' + modId,
    packageDir
  })

  const projectFile = {
    meta: {
      version: '1.0.0',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    },
    config: config,
    workspace: {
      blocks: [],
      customBlocks: [],
      selectedFile: null
    }
  }

  fs.writeFileSync(
    path.join(projectPath, '.modproject'),
    JSON.stringify(projectFile, null, 2),
    'utf-8'
  )

  return {
    success: true,
    projectPath: projectPath,
    structure: structure,
    projectFile: projectFile
  }
}

function loadProject(projectPath) {
  const projectFilePath = path.join(projectPath, '.modproject')
  
  if (!fs.existsSync(projectFilePath)) {
    return { success: false, error: '不是有效的模组项目目录 (缺少 .modproject 文件)' }
  }

  try {
    const content = fs.readFileSync(projectFilePath, 'utf-8')
    const projectFile = JSON.parse(content)
    return {
      success: true,
      projectFile: projectFile,
      projectPath: projectPath
    }
  } catch (err) {
    return { success: false, error: '项目文件解析失败: ' + err.message }
  }
}

function saveProject(projectPath, data) {
  const projectFilePath = path.join(projectPath, '.modproject')
  
  try {
    let existingData = {}
    if (fs.existsSync(projectFilePath)) {
      const content = fs.readFileSync(projectFilePath, 'utf-8')
      existingData = JSON.parse(content)
    }

    const updatedData = {
      ...existingData,
      ...data,
      meta: {
        ...existingData.meta,
        lastModified: new Date().toISOString()
      }
    }

    fs.writeFileSync(projectFilePath, JSON.stringify(updatedData, null, 2), 'utf-8')
    return { success: true, projectFile: updatedData }
  } catch (err) {
    return { success: false, error: '保存项目失败: ' + err.message }
  }
}

function generateForgeStructure(config) {
  const { projectPath, modId, modName, modVersion, author, description, packageName, packageDir } = config
  
  const srcMainJava = path.join(projectPath, 'src/main/java', packageDir)
  const resourcesDir = path.join(projectPath, 'src/main/resources')
  
  const directories = [
    srcMainJava,
    path.join(resourcesDir, 'assets/' + modId + '/blockstates'),
    path.join(resourcesDir, 'assets/' + modId + '/models/block'),
    path.join(resourcesDir, 'assets/' + modId + '/models/item'),
    path.join(resourcesDir, 'assets/' + modId + '/textures/block'),
    path.join(resourcesDir, 'assets/' + modId + '/textures/item'),
    path.join(resourcesDir, 'assets/' + modId + '/lang'),
    path.join(resourcesDir, 'data/' + modId + '/recipes'),
    path.join(resourcesDir, 'data/' + modId + '/loot_tables/blocks'),
    path.join(resourcesDir, 'META-INF'),
    path.join(projectPath, 'gradle/wrapper')
  ]

  for (const dir of directories) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  fs.writeFileSync(path.join(projectPath, 'build.gradle'), generateBuildGradle(modId, modVersion))
  fs.writeFileSync(path.join(projectPath, 'settings.gradle'), generateSettingsGradle(modId))
  fs.writeFileSync(path.join(projectPath, 'gradle.properties'), generateGradleProperties())
  fs.writeFileSync(path.join(srcMainJava, modId.charAt(0).toUpperCase() + modId.slice(1) + 'Mod.java'), generateMainModClass(modId, modName, packageName))
  fs.writeFileSync(path.join(resourcesDir, 'META-INF', 'mods.toml'), generateModsToml(modId, modName, modVersion, author, description))
  fs.writeFileSync(path.join(resourcesDir, 'assets/' + modId + '/lang/zh_cn.json'), generateLangFile(modId, modName, 'zh_cn'))
  fs.writeFileSync(path.join(resourcesDir, 'assets/' + modId + '/lang/en_us.json'), generateLangFile(modId, modName, 'en_us'))

  return {
    directories: directories,
    files: [
      'build.gradle',
      'settings.gradle',
      'gradle.properties',
      'mods.toml',
      'src/main/java/' + packageDir + '/' + modId.charAt(0).toUpperCase() + modId.slice(1) + 'Mod.java',
      'src/main/resources/assets/' + modId + '/lang/zh_cn.json',
      'src/main/resources/assets/' + modId + '/lang/en_us.json'
    ]
  }
}

function generateBuildGradle(modId, version) {
  return `plugins {
    id 'eclipse'
    id 'maven-publish'
    id 'net.minecraftforge.gradle' version '5.1.+'
}

version = '${version}'
group = 'com.${modId}'
archivesBaseName = '${modId}'

java.toolchain.languageVersion = JavaLanguageVersion.of(17)

println "Java: \${System.getProperty 'java.version'} (JVM \${System.getProperty 'java.vm.version'}), \${System.getProperty 'java.vendor'} - \${System.getProperty 'os.arch'}"
println "Gradle: \${project.gradle.gradleVersion}"
println "Android SDK: \${project.hasProperty('android') ? project.property('android') : '(not set)'}"

minecraft {
    mappings channel: 'official', version: '1.20.1'
    
    runs {
        client {
            workingDirectory project.file('run')
            property 'forge.logging.markers', 'REGISTRIES'
            property 'forge.logging.console.level', 'debug'
            property 'forge.enabledGameTestNamespaces', '${modId}'
            mods {
                ${modId} {
                    source sourceSets.main
                }
            }
        }

        server {
            workingDirectory project.file('run')
            property 'forge.logging.markers', 'REGISTRIES'
            property 'forge.logging.console.level', 'debug'
            property 'forge.enabledGameTestNamespaces', '${modId}'
            mods {
                ${modId} {
                    source sourceSets.main
                }
            }
        }

        data {
            workingDirectory project.file('run-data')
            args '--mod', '${modId}', '--all', '--output', file('src/generated/resources/'), '--existing', file('src/main/resources/')
            property 'forge.logging.markers', 'REGISTRIES'
            property 'forge.logging.console.level', 'debug'
            property 'forge.enabledGameTestNamespaces', '${modId}'
            mods {
                ${modId} {
                    source sourceSets.main
                }
            }
        }
    }
}

sourceSets.main.resources { srcDir 'src/generated/resources' }

repositories {
}

dependencies {
    minecraft 'net.minecraftforge:forge:1.20.1-47.2.0'
}

tasks.withType(JavaCompile).configureEach {
    options.encoding = 'UTF-8'
}

jar {
    manifest {
        attributes([
            "Specification-Title"     : "${modId}",
            "Specification-Vendor"    : "modder",
            "Specification-Version"   : "1",
            "Implementation-Title"    : project.name,
            "Implementation-Version"  : "\${archiveVersion.get()}",
            "Implementation-Vendor"   : "modder",
            "Implementation-Timestamp": new Date().format("yyyy-MM-dd'T'HH:mm:ssZ")
        ])
    }
}

jar.finalizedBy('reobfJar')

publishing {
    publications {
        mavenJava(MavenPublication) {
            artifact jar
        }
    }
    repositories {
    }
}
`
}

function generateSettingsGradle(modId) {
  return `pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenLocal()
        mavenCentral()
        maven {
            name = 'MinecraftForge'
            url = 'https://maven.minecraftforge.net/'
        }
    }
}

plugins {
    id 'org.gradle.toolchains.foojay-resolver-convention' version '0.5.0'
}

rootProject.name = '${modId}'
`
}

function generateGradleProperties() {
  return `org.gradle.jvmargs=-Xmx6G -XX:MaxMetaspaceSize=1G
org.gradle.parallel=true
org.gradle.caching=true
mixin.env.remapRefMap=true
mixin.env.refMapRemappingFile=\${buildDir}/createSrgToMcp/output.srg
modId=examplemod
modName=Example Mod
modVersion=1.0.0
modAuthors=Example Author
`
}

function generateMainModClass(modId, modName, packageName) {
  const className = modId.charAt(0).toUpperCase() + modId.slice(1) + 'Mod'
  return `package ${packageName};

import net.minecraft.world.item.CreativeModeTabs;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

@Mod("${modId}")
public class ${className} {

    public static final String MOD_ID = "${modId}";

    public static final DeferredRegister<Block> BLOCKS = DeferredRegister.create(ForgeRegistries.BLOCKS, MOD_ID);
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(ForgeRegistries.ITEMS, MOD_ID);

    public ${className}() {
        IEventBus modEventBus = FMLJavaModLoadingContext.get().getModEventBus();
        
        modEventBus.addListener(this::commonSetup);

        BLOCKS.register(modEventBus);
        ITEMS.register(modEventBus);

        MinecraftForge.EVENT_BUS.register(this);
    }

    private void commonSetup(final FMLCommonSetupEvent event) {
        // 通用设置
    }

    @SubscribeEvent
    public void onServerStarting(net.minecraftforge.event.server.ServerStartingEvent event) {
        // 服务器启动时执行
    }
}
`
}

function generateModsToml(modId, modName, version, author, description) {
  return `modLoader="javafml"
loaderVersion="[47,)"
license="MIT"

[[mods]]
modId="${modId}"
version="${version}"
displayName="${modName}"
authors="${author}"
description='''
${description}
'''
`
}

function generateLangFile(modId, modName, lang) {
  const data = {
    [`itemGroup.${modId}`]: modName
  }
  return JSON.stringify(data, null, 2)
}

module.exports = {
  createProject,
  loadProject,
  saveProject,
  generateForgeStructure
}