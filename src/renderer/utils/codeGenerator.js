export function setupJavaGenerator(javacodeGenerator, store) {
  const modId = store.modId
  const modName = store.modName
  const packageName = store.packageName || 'com.examplemod'
  const className = modId.charAt(0).toUpperCase() + modId.slice(1) + 'Mod'

  javacodeGenerator.forBlock['mod_info'] = function(block) {
    return `// ${modName} (${modId})\n`
  }

  javacodeGenerator.forBlock['mod_event_bus_register'] = function(block, generator) {
    const className = generator.valueToCode(block, 'CLASS', generator.ORDER_ATOMIC) || 'Object'
    return `MinecraftForge.EVENT_BUS.register(${className}.class);\n`
  }

  javacodeGenerator.forBlock['mod_deferred_register'] = function(block, generator) {
    const registry = block.getFieldValue('REGISTRY')
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || `"${modId}"`
    return [`DeferredRegister.create(ForgeRegistries.${registry}, ${name})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['register_block'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"block"'
    const props = generator.valueToCode(block, 'PROPERTIES', generator.ORDER_ATOMIC) || 'BlockBehaviour.Properties.of()'
    return `public static final RegistryObject<Block> ${name.replace(/"/g, '').toUpperCase()} = BLOCKS.register(${name}, () -> new Block(${props}));\n`
  }

  javacodeGenerator.forBlock['block_properties'] = function(block, generator) {
    const strength = generator.valueToCode(block, 'STRENGTH', generator.ORDER_ATOMIC) || '2.0'
    const resistance = generator.valueToCode(block, 'RESISTANCE', generator.ORDER_ATOMIC) || '3.0'
    const tool = block.getFieldValue('TOOL')
    const level = block.getFieldValue('LEVEL')
    return [`BlockBehaviour.Properties.of().strength(${strength}f, ${resistance}f)`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['block_behaviour_copy'] = function(block) {
    const source = block.getFieldValue('SOURCE')
    return [`BlockBehaviour.Properties.copy(Blocks.${source})`, javacodeGenerator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['block_harvest_level'] = function(block, generator) {
    const level = generator.valueToCode(block, 'LEVEL', generator.ORDER_ATOMIC) || '0'
    return `// 采集等级: ${level}\n`
  }

  javacodeGenerator.forBlock['register_item'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"item"'
    const props = generator.valueToCode(block, 'PROPERTIES', generator.ORDER_ATOMIC) || 'new Item.Properties()'
    return `public static final RegistryObject<Item> ${name.replace(/"/g, '').toUpperCase()} = ITEMS.register(${name}, () -> new Item(${props}));\n`
  }

  javacodeGenerator.forBlock['register_armor'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"armor"'
    const type = block.getFieldValue('TYPE')
    const material = generator.valueToCode(block, 'MATERIAL', generator.ORDER_ATOMIC) || 'ArmorMaterials.IRON'
    return `public static final RegistryObject<ArmorItem> ${name.replace(/"/g, '').toUpperCase()}_${type} = ITEMS.register(${name} + "_${type.toLowerCase()}", () -> new ArmorItem(${material}, ArmorItem.Type.${type}, new Item.Properties()));\n`
  }

  javacodeGenerator.forBlock['register_tool'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"tool"'
    const type = block.getFieldValue('TYPE')
    const tier = generator.valueToCode(block, 'TIER', generator.ORDER_ATOMIC) || 'Tiers.IRON'
    let toolClass = 'SwordItem'
    if (type === 'PICKAXE') toolClass = 'PickaxeItem'
    else if (type === 'AXE') toolClass = 'AxeItem'
    else if (type === 'SHOVEL') toolClass = 'ShovelItem'
    else if (type === 'HOE') toolClass = 'HoeItem'
    return `public static final RegistryObject<${toolClass}> ${name.replace(/"/g, '').toUpperCase()}_${type} = ITEMS.register(${name} + "_${type.toLowerCase()}", () -> new ${toolClass}(${tier}, 3, -2.4F, new Item.Properties()));\n`
  }

  javacodeGenerator.forBlock['register_food'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"food"'
    const nutrition = generator.valueToCode(block, 'NUTRITION', generator.ORDER_ATOMIC) || '4'
    const saturation = generator.valueToCode(block, 'SATURATION', generator.ORDER_ATOMIC) || '0.3'
    return `public static final RegistryObject<Item> ${name.replace(/"/g, '').toUpperCase()} = ITEMS.register(${name}, () -> new Item(new Item.Properties().food(new FoodProperties.Builder().nutrition(${nutrition}).saturationMod(${saturation}f).build())));\n`
  }

  javacodeGenerator.forBlock['item_properties'] = function(block, generator) {
    const stack = generator.valueToCode(block, 'STACK', generator.ORDER_ATOMIC) || '64'
    return [`new Item.Properties().stacksTo(${stack})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['creative_tab'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"tab"'
    return `// 创造模式物品栏: ${name}\n`
  }

  javacodeGenerator.forBlock['register_entity'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"entity"'
    return `// 实体注册: ${name}\n`
  }

  javacodeGenerator.forBlock['entity_attributes'] = function(block, { valueToCode, ORDER_ATOMIC }) {
    const health = valueToCode('MAX_HEALTH', ORDER_ATOMIC) || '20.0'
    const speed = valueToCode('MOVEMENT_SPEED', ORDER_ATOMIC) || '0.3'
    const damage = valueToCode('ATTACK_DAMAGE', ORDER_ATOMIC) || '2.0'
    return [`EntityAttribute.builder().create()`, ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['entity_spawn'] = function(block, generator) {
    const entity = generator.valueToCode(block, 'ENTITY', generator.ORDER_ATOMIC) || 'Entity'
    const biome = block.getFieldValue('BIOME')
    const weight = generator.valueToCode(block, 'WEIGHT', generator.ORDER_ATOMIC) || '10'
    return `// 实体自然生成: ${entity} in ${biome} weight ${weight}\n`
  }

  javacodeGenerator.forBlock['register_ore_feature'] = function(block, generator) {
    const blockName = generator.valueToCode(block, 'BLOCK', generator.ORDER_ATOMIC) || 'Block'
    const veinSize = generator.valueToCode(block, 'VEIN_SIZE', generator.ORDER_ATOMIC) || '9'
    const maxY = generator.valueToCode(block, 'MAX_Y', generator.ORDER_ATOMIC) || '64'
    const veins = generator.valueToCode(block, 'VEINS_PER_CHUNK', generator.ORDER_ATOMIC) || '20'
    return `// 矿物生成: ${blockName}, 矿脉大小 ${veinSize}, 最大Y ${maxY}, 每区块 ${veins} 个矿脉\n`
  }

  javacodeGenerator.forBlock['ore_configuration'] = function(block, generator) {
    const count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC) || '10'
    const size = generator.valueToCode(block, 'SIZE', generator.ORDER_ATOMIC) || '8'
    return [`OreConfiguration.target(${count}, ${size})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['world_gen_event'] = function(block, generator) {
    const code = generator.statementToCode(block, 'CODE')
    return `// 世界生成事件\n${code}`
  }

  javacodeGenerator.forBlock['event_on_block_break'] = function(block, generator) {
    const code = generator.statementToCode(block, 'CODE')
    return `@SubscribeEvent\npublic void onBlockBreak(BlockEvent.BreakEvent event) {\n${code}}\n`
  }

  javacodeGenerator.forBlock['event_on_entity_join'] = function(block, generator) {
    const code = generator.statementToCode(block, 'CODE')
    return `@SubscribeEvent\npublic void onEntityJoin(EntityJoinLevelEvent event) {\n${code}}\n`
  }

  javacodeGenerator.forBlock['event_on_item_use'] = function(block, generator) {
    const code = generator.statementToCode(block, 'CODE')
    return `@SubscribeEvent\npublic void onItemUse(UseItemOnBlockEvent event) {\n${code}}\n`
  }

  javacodeGenerator.forBlock['event_on_tick'] = function(block, generator) {
    const side = block.getFieldValue('SIDE')
    const code = generator.statementToCode(block, 'CODE')
    return `@SubscribeEvent\npublic void onTick(TickEvent.${side}TickEvent event) {\n${code}}\n`
  }

  javacodeGenerator.forBlock['event_subscribe'] = function(block, generator) {
    const eventName = generator.valueToCode(block, 'EVENT_NAME', generator.ORDER_ATOMIC) || 'Event'
    const code = generator.statementToCode(block, 'CODE')
    return `@SubscribeEvent\npublic void on${eventName.replace(/"/g, '')}(Event event) {\n${code}}\n`
  }

  javacodeGenerator.forBlock['register_enchantment'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"enchantment"'
    const maxLevel = generator.valueToCode(block, 'MAX_LEVEL', generator.ORDER_ATOMIC) || '3'
    return `// 附魔注册: ${name} 最大等级 ${maxLevel}\n`
  }

  javacodeGenerator.forBlock['register_potion'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"potion"'
    const duration = generator.valueToCode(block, 'DURATION', generator.ORDER_ATOMIC) || '200'
    const amplifier = generator.valueToCode(block, 'AMPLIFIER', generator.ORDER_ATOMIC) || '0'
    return `// 药水注册: ${name} 持续 ${duration} 刻 等级 ${amplifier}\n`
  }

  javacodeGenerator.forBlock['enchantment_effect'] = function(block, generator) {
    const ench = generator.valueToCode(block, 'ENCHANTMENT', generator.ORDER_ATOMIC) || 'Enchantment'
    const code = generator.statementToCode(block, 'EFFECT_CODE')
    return `// 附魔效果: ${ench}\n${code}`
  }

  javacodeGenerator.forBlock['register_recipe'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"recipe"'
    const result = generator.valueToCode(block, 'RESULT', generator.ORDER_ATOMIC) || 'Item'
    const count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC) || '1'
    return `// 配方注册: ${name} -> ${result} x${count}\n`
  }

  javacodeGenerator.forBlock['shapeless_recipe'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"recipe"'
    const result = generator.valueToCode(block, 'RESULT', generator.ORDER_ATOMIC) || 'Item'
    return `// 无序配方: ${name} -> ${result}\n`
  }

  javacodeGenerator.forBlock['shaped_recipe'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"recipe"'
    const pattern = generator.valueToCode(block, 'PATTERN', generator.ORDER_ATOMIC) || '"pattern"'
    const result = generator.valueToCode(block, 'RESULT', generator.ORDER_ATOMIC) || 'Item'
    return `// 有序配方: ${name} 图案 ${pattern} -> ${result}\n`
  }

  javacodeGenerator.forBlock['register_menu'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"menu"'
    const title = generator.valueToCode(block, 'TITLE', generator.ORDER_ATOMIC) || '"Menu"'
    const slots = generator.valueToCode(block, 'SLOTS', generator.ORDER_ATOMIC) || '9'
    return `// 菜单注册: ${name} 标题 ${title} 槽位 ${slots}\n`
  }

  javacodeGenerator.forBlock['menu_slot'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0'
    const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0'
    return `// 添加物品槽位 (${x}, ${y})\n`
  }

  javacodeGenerator.forBlock['player_inv_access'] = function(block, generator) {
    const code = generator.statementToCode(block, 'CODE')
    return `// 访问玩家背包\n${code}`
  }

  javacodeGenerator.forBlock['register_network_channel'] = function(block, generator) {
    const channel = generator.valueToCode(block, 'CHANNEL_NAME', generator.ORDER_ATOMIC) || '"channel"'
    const version = generator.valueToCode(block, 'PROTOCOL_VERSION', generator.ORDER_ATOMIC) || '"1"'
    return `// 网络通道注册: ${channel} 协议版本 ${version}\n// NetworkRegistry.ChannelBuilder.named(new ResourceLocation(MOD_ID, ${channel})).networkProtocolVersion(() -> ${version}).clientAcceptedVersions(s -> true).serverAcceptedVersions(s -> true).simpleChannel().registerObject(new SimpleChannel());\n`
  }

  javacodeGenerator.forBlock['send_packet_to_server'] = function(block, generator) {
    const channel = generator.valueToCode(block, 'CHANNEL', generator.ORDER_ATOMIC) || '"channel"'
    const data = generator.valueToCode(block, 'DATA', generator.ORDER_ATOMIC) || 'null'
    return `// 发送数据包到服务器: ${channel}\n// channel.sendToServer(new MyPacket(${data}));\n`
  }

  javacodeGenerator.forBlock['send_packet_to_client'] = function(block, generator) {
    const channel = generator.valueToCode(block, 'CHANNEL', generator.ORDER_ATOMIC) || '"channel"'
    const data = generator.valueToCode(block, 'DATA', generator.ORDER_ATOMIC) || 'null'
    return `// 发送数据包到客户端: ${channel}\n// channel.send(PacketDistributor.ALL.noArg(), new MyPacket(${data}));\n`
  }

  javacodeGenerator.forBlock['handle_packet'] = function(block, generator) {
    const channel = generator.valueToCode(block, 'CHANNEL', generator.ORDER_ATOMIC) || '"channel"'
    const code = generator.statementToCode(block, 'CODE')
    return `// 处理数据包: ${channel}\n${code}`
  }

  javacodeGenerator.forBlock['network_message'] = function(block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', generator.ORDER_ATOMIC) || '""'
    return [`new NetworkMessage(${message})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['spawn_particle'] = function(block, generator) {
    const particle = generator.valueToCode(block, 'PARTICLE_TYPE', generator.ORDER_ATOMIC) || 'ParticleTypes.FLAME'
    const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0'
    const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '0'
    const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || '0'
    const count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC) || '1'
    return `// 生成粒子: ${particle} at (${x}, ${y}, ${z}) x${count}\n// level.addParticle(${particle}, ${x}, ${y}, ${z}, 0, 0, 0);\n`
  }

  javacodeGenerator.forBlock['particle_type'] = function(block) {
    const type = block.getFieldValue('TYPE')
    const typeMap = {
      'FLAME': 'ParticleTypes.FLAME', 'SMOKE': 'ParticleTypes.SMOKE',
      'HEART': 'ParticleTypes.HEART', 'NOTE': 'ParticleTypes.NOTE',
      'PORTAL': 'ParticleTypes.PORTAL', 'ENCHANT': 'ParticleTypes.ENCHANT',
      'EXPLOSION': 'ParticleTypes.EXPLOSION', 'DRAGON_BREATH': 'ParticleTypes.DRAGON_BREATH',
      'SPORE': 'ParticleTypes.SPORE_BLOSSOM_AIR', 'BUBBLE': 'ParticleTypes.BUBBLE'
    }
    return [typeMap[type] || 'ParticleTypes.FLAME', generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['particle_config'] = function(block, generator) {
    const sx = generator.valueToCode(block, 'SPEED_X', generator.ORDER_ATOMIC) || '0'
    const sy = generator.valueToCode(block, 'SPEED_Y', generator.ORDER_ATOMIC) || '0'
    const sz = generator.valueToCode(block, 'SPEED_Z', generator.ORDER_ATOMIC) || '0'
    return [`new ParticleConfig(${sx}, ${sy}, ${sz})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['particle_at_block'] = function(block, generator) {
    const pos = generator.valueToCode(block, 'BLOCK_POS', generator.ORDER_ATOMIC) || 'BlockPos.ZERO'
    const particle = generator.valueToCode(block, 'PARTICLE_TYPE', generator.ORDER_ATOMIC) || 'ParticleTypes.FLAME'
    return `// 在方块 ${pos} 处生成粒子 ${particle}\n`
  }

  javacodeGenerator.forBlock['particle_ring'] = function(block, generator) {
    const cx = generator.valueToCode(block, 'CENTRE_X', generator.ORDER_ATOMIC) || '0'
    const cy = generator.valueToCode(block, 'CENTRE_Y', generator.ORDER_ATOMIC) || '0'
    const cz = generator.valueToCode(block, 'CENTRE_Z', generator.ORDER_ATOMIC) || '0'
    const radius = generator.valueToCode(block, 'RADIUS', generator.ORDER_ATOMIC) || '1'
    const particle = generator.valueToCode(block, 'PARTICLE_TYPE', generator.ORDER_ATOMIC) || 'ParticleTypes.FLAME'
    return `// 粒子环效果: 中心(${cx}, ${cy}, ${cz}) 半径 ${radius} 粒子 ${particle}\n`
  }

  javacodeGenerator.forBlock['play_sound'] = function(block, generator) {
    const sound = generator.valueToCode(block, 'SOUND_EVENT', generator.ORDER_ATOMIC) || 'SoundEvents.UI_BUTTON_CLICK'
    const volume = generator.valueToCode(block, 'VOLUME', generator.ORDER_ATOMIC) || '1.0'
    const pitch = generator.valueToCode(block, 'PITCH', generator.ORDER_ATOMIC) || '1.0'
    return `// 播放声音: ${sound} 音量 ${volume} 音调 ${pitch}\n`
  }

  javacodeGenerator.forBlock['register_sound_event'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"sound"'
    return `// 注册声音事件: ${name}\n// public static final RegistryObject<SoundEvent> ${name.replace(/"/g, '').toUpperCase()}_SOUND = SOUNDS.register(${name}, () -> SoundEvent.createVariableRangeEvent(new ResourceLocation(MOD_ID, ${name})));\n`
  }

  javacodeGenerator.forBlock['sound_at_player'] = function(block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', generator.ORDER_ATOMIC) || 'player'
    const sound = generator.valueToCode(block, 'SOUND', generator.ORDER_ATOMIC) || 'SoundEvents.UI_BUTTON_CLICK'
    return `// 在玩家 ${player} 处播放 ${sound}\n`
  }

  javacodeGenerator.forBlock['sound_at_block'] = function(block, generator) {
    const pos = generator.valueToCode(block, 'BLOCK_POS', generator.ORDER_ATOMIC) || 'BlockPos.ZERO'
    const sound = generator.valueToCode(block, 'SOUND', generator.ORDER_ATOMIC) || 'SoundEvents.UI_BUTTON_CLICK'
    return `// 在方块 ${pos} 处播放 ${sound}\n`
  }

  javacodeGenerator.forBlock['custom_sound_config'] = function(block, generator) {
    const name = generator.valueToCode(block, 'SOUND_NAME', generator.ORDER_ATOMIC) || '"sound"'
    const category = block.getFieldValue('CATEGORY')
    return [`new SoundConfig(${name}, SoundCategory.${category})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['register_advancement'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"advancement"'
    return `// 进度注册: ${name}\n`
  }

  javacodeGenerator.forBlock['advancement_criteria'] = function(block, generator) {
    const item = generator.valueToCode(block, 'ITEM', generator.ORDER_ATOMIC) || '"item"'
    const trigger = block.getFieldValue('TRIGGER')
    return [`new AdvancementCriteria(${item}, CriteriaTrigger.${trigger})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['advancement_reward'] = function(block, generator) {
    const exp = generator.valueToCode(block, 'EXPERIENCE', generator.ORDER_ATOMIC) || '0'
    const loot = generator.valueToCode(block, 'LOOT_TABLE', generator.ORDER_ATOMIC) || '""'
    return [`new AdvancementReward(${exp}, ${loot})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['grant_advancement'] = function(block, generator) {
    const player = generator.valueToCode(block, 'PLAYER', generator.ORDER_ATOMIC) || 'player'
    const adv = generator.valueToCode(block, 'ADVANCEMENT', generator.ORDER_ATOMIC) || '"advancement"'
    return `// 授予玩家 ${player} 进度 ${adv}\n`
  }

  javacodeGenerator.forBlock['advancement_display'] = function(block, generator) {
    const title = generator.valueToCode(block, 'TITLE', generator.ORDER_ATOMIC) || '"title"'
    const desc = generator.valueToCode(block, 'DESCRIPTION', generator.ORDER_ATOMIC) || '"description"'
    const icon = generator.valueToCode(block, 'ICON_ITEM', generator.ORDER_ATOMIC) || '"item"'
    const frame = block.getFieldValue('FRAME')
    return [`new AdvancementDisplay(${title}, ${desc}, ${icon}, FrameType.${frame})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['register_data_component'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"component"'
    const defVal = generator.valueToCode(block, 'DEFAULT_VALUE', generator.ORDER_ATOMIC) || 'null'
    return `// 数据组件注册: ${name} 默认 ${defVal}\n`
  }

  javacodeGenerator.forBlock['data_component_type'] = function(block) {
    const type = block.getFieldValue('TYPE')
    const typeMap = {
      'INT': 'DataComponentType.INT', 'FLOAT': 'DataComponentType.FLOAT',
      'STRING': 'DataComponentType.STRING', 'BOOLEAN': 'DataComponentType.BOOLEAN',
      'ITEM_STACK': 'DataComponentType.ITEM_STACK', 'NBT': 'DataComponentType.NBT'
    }
    return [typeMap[type] || 'DataComponentType.STRING', generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['set_data_component'] = function(block, generator) {
    const item = generator.valueToCode(block, 'ITEM', generator.ORDER_ATOMIC) || 'item'
    const comp = generator.valueToCode(block, 'COMPONENT', generator.ORDER_ATOMIC) || '"component"'
    const val = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || 'null'
    return `// 设置 ${item} 的数据组件 ${comp} = ${val}\n`
  }

  javacodeGenerator.forBlock['get_data_component'] = function(block, generator) {
    const item = generator.valueToCode(block, 'ITEM', generator.ORDER_ATOMIC) || 'item'
    const comp = generator.valueToCode(block, 'COMPONENT', generator.ORDER_ATOMIC) || '"component"'
    return [`getComponent(${item}, ${comp})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['data_component_value'] = function(block, generator) {
    const val = generator.valueToCode(block, 'VALUE', generator.ORDER_ATOMIC) || 'null'
    return [`new DataComponentValue(${val})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['register_tag'] = function(block, generator) {
    const tagName = generator.valueToCode(block, 'TAG_NAME', generator.ORDER_ATOMIC) || '"tag"'
    const tagType = block.getFieldValue('TAG_TYPE')
    return `// 注册${tagType}标签: ${tagName}\n`
  }

  javacodeGenerator.forBlock['block_tag'] = function(block, generator) {
    const tagName = generator.valueToCode(block, 'TAG_NAME', generator.ORDER_ATOMIC) || '"tag"'
    const blockName = generator.valueToCode(block, 'BLOCK', generator.ORDER_ATOMIC) || '"block"'
    return `// 方块 ${blockName} 添加到标签 ${tagName}\n`
  }

  javacodeGenerator.forBlock['item_tag'] = function(block, generator) {
    const tagName = generator.valueToCode(block, 'TAG_NAME', generator.ORDER_ATOMIC) || '"tag"'
    const item = generator.valueToCode(block, 'ITEM', generator.ORDER_ATOMIC) || '"item"'
    return `// 物品 ${item} 添加到标签 ${tagName}\n`
  }

  javacodeGenerator.forBlock['entity_type_tag'] = function(block, generator) {
    const tagName = generator.valueToCode(block, 'TAG_NAME', generator.ORDER_ATOMIC) || '"tag"'
    const entity = generator.valueToCode(block, 'ENTITY', generator.ORDER_ATOMIC) || '"entity"'
    return `// 实体 ${entity} 添加到标签 ${tagName}\n`
  }

  javacodeGenerator.forBlock['tag_check'] = function(block, generator) {
    const tagName = generator.valueToCode(block, 'TAG_NAME', generator.ORDER_ATOMIC) || '"tag"'
    const target = generator.valueToCode(block, 'TARGET', generator.ORDER_ATOMIC) || 'target'
    return [`checkTag(${tagName}, ${target})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['register_structure'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"structure"'
    const structType = block.getFieldValue('STRUCT_TYPE')
    return `// 注册结构: ${name} 类型 ${structType}\n`
  }

  javacodeGenerator.forBlock['structure_placement'] = function(block, generator) {
    const structure = generator.valueToCode(block, 'STRUCTURE', generator.ORDER_ATOMIC) || '"structure"'
    const biome = block.getFieldValue('BIOME')
    const spacing = generator.valueToCode(block, 'SPACING', generator.ORDER_ATOMIC) || '32'
    const separation = generator.valueToCode(block, 'SEPARATION', generator.ORDER_ATOMIC) || '8'
    return `// 结构放置: ${structure} 在 ${biome} 间距 ${spacing} 分离 ${separation}\n`
  }

  javacodeGenerator.forBlock['structure_jigsaw'] = function(block, generator) {
    const pool = generator.valueToCode(block, 'TEMPLATE_POOL', generator.ORDER_ATOMIC) || '"pool"'
    const depth = generator.valueToCode(block, 'MAX_DEPTH', generator.ORDER_ATOMIC) || '7'
    return `// 拼图结构: 模板池 ${pool} 最大深度 ${depth}\n`
  }

  javacodeGenerator.forBlock['structure_template'] = function(block, generator) {
    const name = generator.valueToCode(block, 'TEMPLATE_NAME', generator.ORDER_ATOMIC) || '"template"'
    return [`new StructureTemplate(${name})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['structure_feature'] = function(block, generator) {
    const name = generator.valueToCode(block, 'NAME', generator.ORDER_ATOMIC) || '"feature"'
    return `// 注册结构特征: ${name}\n`
  }

  javacodeGenerator.forBlock['register_villager_trade'] = function(block, generator) {
    const profession = generator.valueToCode(block, 'PROFESSION', generator.ORDER_ATOMIC) || '"profession"'
    const level = generator.valueToCode(block, 'LEVEL', generator.ORDER_ATOMIC) || '1'
    return `// 注册村民交易: 职业 ${profession} 等级 ${level}\n`
  }

  javacodeGenerator.forBlock['trade_item'] = function(block, generator) {
    const item = generator.valueToCode(block, 'ITEM', generator.ORDER_ATOMIC) || '"item"'
    const count = generator.valueToCode(block, 'COUNT', generator.ORDER_ATOMIC) || '1'
    return [`new TradeItem(${item}, ${count})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['trade_offer'] = function(block, generator) {
    const input1 = generator.valueToCode(block, 'INPUT1', generator.ORDER_ATOMIC) || 'null'
    const input2 = generator.valueToCode(block, 'INPUT2', generator.ORDER_ATOMIC) || 'null'
    const result = generator.valueToCode(block, 'RESULT', generator.ORDER_ATOMIC) || 'null'
    const maxUses = generator.valueToCode(block, 'MAX_USES', generator.ORDER_ATOMIC) || '12'
    const xp = generator.valueToCode(block, 'XP_REWARD', generator.ORDER_ATOMIC) || '1'
    return [`new TradeOffer(${input1}, ${input2}, ${result}, ${maxUses}, ${xp})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['wandering_trader_trade'] = function(block, generator) {
    return `// 流浪商人交易\n`
  }

  javacodeGenerator.forBlock['trade_config'] = function(block, generator) {
    const multiplier = generator.valueToCode(block, 'PRICE_MULTIPLIER', generator.ORDER_ATOMIC) || '0.05'
    const demand = generator.valueToCode(block, 'DEMAND', generator.ORDER_ATOMIC) || '0'
    return [`new TradeConfig(${multiplier}, ${demand})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['register_command'] = function(block, generator) {
    const cmdName = generator.valueToCode(block, 'COMMAND_NAME', generator.ORDER_ATOMIC) || '"command"'
    const code = generator.statementToCode(block, 'CODE')
    return `// 注册命令: ${cmdName}\n${code}`
  }

  javacodeGenerator.forBlock['command_argument'] = function(block, generator) {
    const argName = generator.valueToCode(block, 'ARG_NAME', generator.ORDER_ATOMIC) || '"arg"'
    const argType = block.getFieldValue('ARG_TYPE')
    return [`new CommandArgument(${argName}, ArgumentType.${argType})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['command_execute'] = function(block, generator) {
    const command = generator.valueToCode(block, 'COMMAND', generator.ORDER_ATOMIC) || '""'
    const source = generator.valueToCode(block, 'SOURCE', generator.ORDER_ATOMIC) || 'source'
    return `// 执行命令: ${command} 来源 ${source}\n`
  }

  javacodeGenerator.forBlock['command_permission'] = function(block, generator) {
    const cmdName = generator.valueToCode(block, 'COMMAND_NAME', generator.ORDER_ATOMIC) || '"command"'
    const level = generator.valueToCode(block, 'PERMISSION_LEVEL', generator.ORDER_ATOMIC) || '2'
    return `// 命令 ${cmdName} 需要权限等级 ${level}\n`
  }

  javacodeGenerator.forBlock['command_feedback'] = function(block, generator) {
    const message = generator.valueToCode(block, 'MESSAGE', generator.ORDER_ATOMIC) || '""'
    const color = block.getFieldValue('COLOR')
    return `// 命令反馈: ${message} (${color})\n`
  }

  javacodeGenerator.forBlock['register_dimension'] = function(block, generator) {
    const dimName = generator.valueToCode(block, 'DIM_NAME', generator.ORDER_ATOMIC) || '"dimension"'
    return `// 注册维度: ${dimName}\n`
  }

  javacodeGenerator.forBlock['dimension_type'] = function(block, generator) {
    const fixedTime = generator.valueToCode(block, 'FIXED_TIME', generator.ORDER_ATOMIC) || '-1'
    const hasSky = block.getFieldValue('HAS_SKYLIGHT') === 'TRUE'
    const hasCeil = block.getFieldValue('HAS_CEILING') === 'TRUE'
    const ultraWarm = block.getFieldValue('ULTRA_WARM') === 'TRUE'
    const brightness = generator.valueToCode(block, 'BRIGHTNESS', generator.ORDER_ATOMIC) || '0'
    return [`new DimensionType(${fixedTime}, ${hasSky}, ${hasCeil}, ${ultraWarm}, ${brightness})`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['dimension_biome'] = function(block, generator) {
    const dim = generator.valueToCode(block, 'DIMENSION', generator.ORDER_ATOMIC) || '"dimension"'
    const biome = generator.valueToCode(block, 'BIOME', generator.ORDER_ATOMIC) || '"biome"'
    return `// 设置维度 ${dim} 生物群系 ${biome}\n`
  }

  javacodeGenerator.forBlock['dimension_teleport'] = function(block, generator) {
    const dim = generator.valueToCode(block, 'DIMENSION', generator.ORDER_ATOMIC) || '"dimension"'
    const x = generator.valueToCode(block, 'X', generator.ORDER_ATOMIC) || '0'
    const y = generator.valueToCode(block, 'Y', generator.ORDER_ATOMIC) || '64'
    const z = generator.valueToCode(block, 'Z', generator.ORDER_ATOMIC) || '0'
    return `// 传送到维度 ${dim} (${x}, ${y}, ${z})\n`
  }

  javacodeGenerator.forBlock['register_block_renderer'] = function(block, generator) {
    const blockName = generator.valueToCode(block, 'BLOCK', generator.ORDER_ATOMIC) || '"block"'
    return `// 注册方块渲染器: ${blockName}\n`
  }

  javacodeGenerator.forBlock['register_entity_renderer'] = function(block, generator) {
    const entity = generator.valueToCode(block, 'ENTITY', generator.ORDER_ATOMIC) || '"entity"'
    const model = generator.valueToCode(block, 'MODEL', generator.ORDER_ATOMIC) || '"model"'
    const texture = generator.valueToCode(block, 'TEXTURE', generator.ORDER_ATOMIC) || '"texture.png"'
    return `// 注册实体渲染器: ${entity} 模型 ${model} 贴图 ${texture}\n`
  }

  javacodeGenerator.forBlock['render_type'] = function(block) {
    const type = block.getFieldValue('TYPE')
    return [`RenderType.${type}`, generator.ORDER_ATOMIC]
  }

  javacodeGenerator.forBlock['custom_model'] = function(block, generator) {
    const modelPath = generator.valueToCode(block, 'MODEL_PATH', generator.ORDER_ATOMIC) || '"model.json"'
    const texturePath = generator.valueToCode(block, 'TEXTURE_PATH', generator.ORDER_ATOMIC) || '"texture.png"'
    return [`new CustomModel(${modelPath}, ${texturePath})`, generator.ORDER_ATOMIC]
  }

  const customBlocks = store.customBlocks || []
  for (const customBlock of customBlocks) {
    javacodeGenerator.forBlock['custom_' + customBlock.id] = function(block) {
      let code = customBlock.template || '// 自定义积木\n'
      
      if (customBlock.parameters) {
        for (const param of customBlock.parameters) {
          if (param.type === 'input') {
            const value = javacodeGenerator.valueToCode(block, param.name, javacodeGenerator.ORDER_ATOMIC) || 'null'
            code = code.replace(new RegExp('\\$\\{' + param.name + '\\}', 'g'), value)
          } else if (param.type === 'dropdown') {
            const value = block.getFieldValue(param.name)
            code = code.replace(new RegExp('\\$\\{' + param.name + '\\}', 'g'), value)
          } else if (param.type === 'text') {
            const value = block.getFieldValue(param.name) || param.default || ''
            code = code.replace(new RegExp('\\$\\{' + param.name + '\\}', 'g'), '"' + value + '"')
          }
        }
      }

      if (customBlock.isOutput) {
        return [code, javacodeGenerator.ORDER_ATOMIC]
      }
      return code + '\n'
    }
  }
}

export function generateJavaCode(xmlString, store) {
  const modId = store.modId || 'examplemod'
  const modName = store.modName || 'Example Mod'
  const packageName = store.packageName || 'com.examplemod'
  const className = modId.charAt(0).toUpperCase() + modId.slice(1) + 'Mod'
  const platform = store.platform || 'forge'
  const mcVersion = store.mcVersion || '1.20.1'

  let classBody = xmlString || ''
  classBody = classBody.replace(/<[^>]+>/g, '')
  classBody = classBody.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

  if (!classBody.trim()) {
    classBody = '// 在此处添加你的模组代码\n'
  }

  if (platform === 'fabric') {
    return `package ${packageName};

import net.fabricmc.api.ModInitializer;
import net.fabricmc.fabric.api.item.v1.FabricItemSettings;
import net.fabricmc.fabric.api.object.builder.v1.block.FabricBlockSettings;
import net.minecraft.block.Block;
import net.minecraft.block.Blocks;
import net.minecraft.item.BlockItem;
import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.util.Identifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ${className} implements ModInitializer {

    public static final String MOD_ID = "${modId}";
    public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

    @Override
    public void onInitialize() {
        LOGGER.info("${modName} 初始化中...");
        // ===== 从积木生成的代码开始 =====
        ${classBody}
        // ===== 从积木生成的代码结束 =====
    }

    public static Identifier id(String path) {
        return new Identifier(MOD_ID, path);
    }
}
`
  }

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
        // 通用设置代码
    }

    // ===== 从积木生成的代码开始 =====
    ${classBody}
    // ===== 从积木生成的代码结束 =====

    @SubscribeEvent
    public void onServerStarting(net.minecraftforge.event.server.ServerStartingEvent event) {
        // 服务器启动时执行
    }
}
`
}

export function parseJavaCodeToBlocks(javaCode) {
  let xml = '<xml xmlns="https://developers.google.com/blockly/xml">'
  
  const lines = javaCode.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    
    if (trimmed.startsWith('public static final RegistryObject<Block>')) {
      const nameMatch = trimmed.match(/RegistryObject<Block>\s+(\w+)/)
      if (nameMatch) {
        xml += `<block type="register_block"><value name="NAME"><shadow type="text"><field name="TEXT">${nameMatch[1].toLowerCase()}</field></shadow></value></block>`
      }
    }
    
    if (trimmed.startsWith('public static final RegistryObject<Item>')) {
      const nameMatch = trimmed.match(/RegistryObject<Item>\s+(\w+)/)
      if (nameMatch) {
        xml += `<block type="register_item"><value name="NAME"><shadow type="text"><field name="TEXT">${nameMatch[1].toLowerCase()}</field></shadow></value></block>`
      }
    }
    
    if (trimmed.startsWith('@SubscribeEvent')) {
      xml += '<block type="event_subscribe"></block>'
    }
  }
  
  xml += '</xml>'
  return xml
}