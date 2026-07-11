export const BLOCK_CATEGORIES = [
  {
    id: 'mod_base',
    name: '模组基础',
    color: '#4CAF50',
    blocks: [
      'mod_info',
      'mod_event_bus_register',
      'mod_deferred_register'
    ]
  },
  {
    id: 'blocks',
    name: '方块系统',
    color: '#8BC34A',
    blocks: [
      'register_block',
      'block_properties',
      'block_behaviour_copy',
      'block_harvest_level'
    ]
  },
  {
    id: 'items',
    name: '物品盔甲工具',
    color: '#FFC107',
    blocks: [
      'register_item',
      'register_armor',
      'register_tool',
      'register_food',
      'item_properties',
      'creative_tab'
    ]
  },
  {
    id: 'entities',
    name: '自定义实体',
    color: '#9C27B0',
    blocks: [
      'register_entity',
      'entity_attributes',
      'entity_spawn'
    ]
  },
  {
    id: 'worldgen',
    name: '世界生成',
    color: '#3F51B5',
    blocks: [
      'register_ore_feature',
      'ore_configuration',
      'world_gen_event'
    ]
  },
  {
    id: 'events',
    name: '事件监听',
    color: '#F44336',
    blocks: [
      'event_on_block_break',
      'event_on_entity_join',
      'event_on_item_use',
      'event_on_tick',
      'event_subscribe'
    ]
  },
  {
    id: 'enchantment',
    name: '附魔药水',
    color: '#00BCD4',
    blocks: [
      'register_enchantment',
      'register_potion',
      'enchantment_effect'
    ]
  },
  {
    id: 'recipes',
    name: '合成系统',
    color: '#E91E63',
    blocks: [
      'register_recipe',
      'shapeless_recipe',
      'shaped_recipe'
    ]
  },
  {
    id: 'gui',
    name: 'GUI界面',
    color: '#FF5722',
    blocks: [
      'register_menu',
      'menu_slot',
      'player_inv_access'
    ]
  },
  {
    id: 'logic',
    name: '逻辑控制',
    color: '#607D8B',
    blocks: [
      'logic_if',
      'logic_if_else',
      'logic_compare',
      'logic_operation',
      'logic_negate',
      'logic_ternary',
      'controls_while',
      'controls_for',
      'controls_for_each',
      'controls_flow_statements'
    ]
  },
  {
    id: 'math',
    name: '数学运算',
    color: '#795548',
    blocks: [
      'math_number',
      'math_arithmetic',
      'math_single',
      'math_trig',
      'math_round',
      'math_on_list',
      'math_modulo',
      'math_constrain',
      'math_random_int',
      'math_random_float'
    ]
  },
  {
    id: 'text',
    name: '文本操作',
    color: '#009688',
    blocks: [
      'text',
      'text_join',
      'text_length',
      'text_isEmpty',
      'text_indexOf',
      'text_charAt',
      'text_getSubstring',
      'text_changeCase',
      'text_trim',
      'text_print'
    ]
  },
  {
    id: 'lists',
    name: '列表数组',
    color: '#673AB7',
    blocks: [
      'lists_create_empty',
      'lists_create_with',
      'lists_repeat',
      'lists_length',
      'lists_isEmpty',
      'lists_indexOf',
      'lists_getIndex',
      'lists_setIndex'
    ]
  },
  {
    id: 'variables',
    name: '变量',
    color: '#A1887F',
    blocks: [
      'variables_get',
      'variables_set'
    ]
  },
  {
    id: 'procedures',
    name: '函数方法',
    color: '#455A64',
    blocks: [
      'procedures_defnoreturn',
      'procedures_defreturn',
      'procedures_callnoreturn',
      'procedures_callreturn',
      'procedures_ifreturn'
    ]
  },
  {
    id: 'network',
    name: '网络通信',
    color: '#FF6F00',
    blocks: [
      'register_network_channel',
      'send_packet_to_server',
      'send_packet_to_client',
      'handle_packet',
      'network_message'
    ]
  },
  {
    id: 'particles',
    name: '粒子效果',
    color: '#FFAB00',
    blocks: [
      'spawn_particle',
      'particle_type',
      'particle_config',
      'particle_at_block',
      'particle_ring'
    ]
  },
  {
    id: 'sounds',
    name: '声音系统',
    color: '#00C853',
    blocks: [
      'play_sound',
      'register_sound_event',
      'sound_at_player',
      'sound_at_block',
      'custom_sound_config'
    ]
  },
  {
    id: 'advancements',
    name: '进度系统',
    color: '#FF6D00',
    blocks: [
      'register_advancement',
      'advancement_criteria',
      'advancement_reward',
      'grant_advancement',
      'advancement_display'
    ]
  },
  {
    id: 'data_components',
    name: '数据组件',
    color: '#304FFE',
    blocks: [
      'register_data_component',
      'data_component_type',
      'set_data_component',
      'get_data_component',
      'data_component_value'
    ]
  },
  {
    id: 'tags',
    name: '标签系统',
    color: '#00BFA5',
    blocks: [
      'register_tag',
      'block_tag',
      'item_tag',
      'entity_type_tag',
      'tag_check'
    ]
  },
  {
    id: 'structures',
    name: '结构生成',
    color: '#D500F9',
    blocks: [
      'register_structure',
      'structure_placement',
      'structure_jigsaw',
      'structure_template',
      'structure_feature'
    ]
  },
  {
    id: 'trading',
    name: '交易系统',
    color: '#FFD600',
    blocks: [
      'register_villager_trade',
      'trade_item',
      'trade_offer',
      'wandering_trader_trade',
      'trade_config'
    ]
  },
  {
    id: 'commands',
    name: '命令系统',
    color: '#DD2C00',
    blocks: [
      'register_command',
      'command_argument',
      'command_execute',
      'command_permission',
      'command_feedback'
    ]
  },
  {
    id: 'dimensions',
    name: '维度系统',
    color: '#6200EA',
    blocks: [
      'register_dimension',
      'dimension_type',
      'dimension_biome',
      'dimension_teleport'
    ]
  },
  {
    id: 'rendering',
    name: '渲染系统',
    color: '#0091EA',
    blocks: [
      'register_block_renderer',
      'register_entity_renderer',
      'render_type',
      'custom_model'
    ]
  },
  {
    id: 'custom',
    name: '自定义积木',
    color: '#FFD600',
    blocks: []
  }
]

export const BLOCK_DEFINITIONS = {
  mod_info: {
    init: function() {
      this.appendDummyInput()
        .appendField('模组信息: ')
        .appendField(new Blockly.FieldTextInput('examplemod'), 'MODID')
        .appendField('名称: ')
        .appendField(new Blockly.FieldTextInput('Example Mod'), 'MODNAME')
      this.setColour('#4CAF50')
      this.setTooltip('设置模组的基本信息')
      this.setDeletable(true)
    }
  },
  mod_event_bus_register: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册事件总线')
      this.appendValueInput('CLASS')
        .setCheck('String')
        .appendField('类: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#4CAF50')
      this.setTooltip('将类注册到事件总线')
    }
  },
  mod_deferred_register: {
    init: function() {
      this.appendDummyInput()
        .appendField('创建延迟注册')
        .appendField('类型: ')
        .appendField(new Blockly.FieldDropdown([
          ['方块 BLOCKS', 'BLOCKS'],
          ['物品 ITEMS', 'ITEMS'],
          ['实体 ENTITIES', 'ENTITIES'],
          ['附魔 ENCHANTMENTS', 'ENCHANTMENTS'],
          ['药水 MOB_EFFECTS', 'MOB_EFFECTS']
        ]), 'REGISTRY')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.setOutput(true, 'DeferredRegister')
      this.setColour('#4CAF50')
      this.setTooltip('创建延迟注册器')
    }
  },
  register_block: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册方块')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendValueInput('PROPERTIES')
        .setCheck('BlockProperties')
        .appendField('属性: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#8BC34A')
      this.setTooltip('注册一个自定义方块')
    }
  },
  block_properties: {
    init: function() {
      this.appendDummyInput()
        .appendField('方块属性')
      this.appendValueInput('STRENGTH')
        .setCheck('Number')
        .appendField('硬度: ')
      this.appendValueInput('RESISTANCE')
        .setCheck('Number')
        .appendField('抗性: ')
      this.appendDummyInput()
        .appendField('工具: ')
        .appendField(new Blockly.FieldDropdown([
          ['镐 PICKAXE', 'PICKAXE'],
          ['斧 AXE', 'AXE'],
          ['铲子 SHOVEL', 'SHOVEL'],
          ['锄 HOE', 'HOE'],
          ['无需工具', 'NONE']
        ]), 'TOOL')
      this.appendDummyInput()
        .appendField('等级: ')
        .appendField(new Blockly.FieldDropdown([
          ['木头', 'WOOD'],
          ['石头', 'STONE'],
          ['铁', 'IRON'],
          ['钻石', 'DIAMOND'],
          ['下界合金', 'NETHERITE']
        ]), 'LEVEL')
      this.setOutput(true, 'BlockProperties')
      this.setColour('#8BC34A')
      this.setTooltip('创建方块属性对象')
    }
  },
  block_behaviour_copy: {
    init: function() {
      this.appendDummyInput()
        .appendField('复制方块行为')
        .appendField('从: ')
        .appendField(new Blockly.FieldDropdown([
          ['石头 STONE', 'STONE'],
          ['泥土 DIRT', 'DIRT'],
          ['沙子 SAND', 'SAND'],
          ['木头 WOOD', 'OAK_LOG'],
          ['玻璃 GLASS', 'GLASS'],
          ['铁块 IRON_BLOCK', 'IRON_BLOCK'],
          ['钻石块 DIAMOND_BLOCK', 'DIAMOND_BLOCK']
        ]), 'SOURCE')
      this.setOutput(true, 'BlockProperties')
      this.setColour('#8BC34A')
    }
  },
  block_harvest_level: {
    init: function() {
      this.appendDummyInput()
        .appendField('设置采集等级')
      this.appendValueInput('LEVEL')
        .setCheck('Number')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#8BC34A')
    }
  },
  register_item: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册物品')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendValueInput('PROPERTIES')
        .setCheck('ItemProperties')
        .appendField('属性: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FFC107')
    }
  },
  register_armor: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册盔甲')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendDummyInput()
        .appendField('类型: ')
        .appendField(new Blockly.FieldDropdown([
          ['头盔 HELMET', 'HELMET'],
          ['胸甲 CHESTPLATE', 'CHESTPLATE'],
          ['护腿 LEGGINGS', 'LEGGINGS'],
          ['靴子 BOOTS', 'BOOTS']
        ]), 'TYPE')
      this.appendValueInput('MATERIAL')
        .setCheck('String')
        .appendField('材质: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FFC107')
    }
  },
  register_tool: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册工具')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendDummyInput()
        .appendField('类型: ')
        .appendField(new Blockly.FieldDropdown([
          ['镐 PICKAXE', 'PICKAXE'],
          ['斧 AXE', 'AXE'],
          ['铲子 SHOVEL', 'SHOVEL'],
          ['锄 HOE', 'HOE'],
          ['剑 SWORD', 'SWORD']
        ]), 'TYPE')
      this.appendValueInput('TIER')
        .setCheck('String')
        .appendField('等级: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FFC107')
    }
  },
  register_food: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册食物')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendValueInput('NUTRITION')
        .setCheck('Number')
        .appendField('营养值: ')
      this.appendValueInput('SATURATION')
        .setCheck('Number')
        .appendField('饱和度: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FFC107')
    }
  },
  item_properties: {
    init: function() {
      this.appendDummyInput()
        .appendField('物品属性')
      this.appendValueInput('STACK')
        .setCheck('Number')
        .appendField('最大堆叠: ')
      this.appendValueInput('TAB')
        .setCheck('String')
        .appendField('创造模式标签: ')
      this.setOutput(true, 'ItemProperties')
      this.setColour('#FFC107')
    }
  },
  creative_tab: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册创造模式物品栏')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FFC107')
    }
  },
  register_entity: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册实体')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendValueInput('ATTRIBUTES')
        .setCheck('EntityAttributes')
        .appendField('属性: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#9C27B0')
    }
  },
  entity_attributes: {
    init: function() {
      this.appendDummyInput()
        .appendField('实体属性')
      this.appendValueInput('MAX_HEALTH')
        .setCheck('Number')
        .appendField('最大生命: ')
      this.appendValueInput('MOVEMENT_SPEED')
        .setCheck('Number')
        .appendField('移动速度: ')
      this.appendValueInput('ATTACK_DAMAGE')
        .setCheck('Number')
        .appendField('攻击伤害: ')
      this.setOutput(true, 'EntityAttributes')
      this.setColour('#9C27B0')
    }
  },
  entity_spawn: {
    init: function() {
      this.appendDummyInput()
        .appendField('设置实体自然生成')
      this.appendValueInput('ENTITY')
        .setCheck('String')
        .appendField('实体: ')
      this.appendDummyInput()
        .appendField('生物群系: ')
        .appendField(new Blockly.FieldDropdown([
          ['平原 PLAINS', 'PLAINS'],
          ['森林 FOREST', 'FOREST'],
          ['沙漠 DESERT', 'DESERT'],
          ['山脉 MOUNTAIN', 'MOUNTAINS'],
          ['海洋 OCEAN', 'OCEAN'],
          ['下界 NETHER', 'NETHER_WASTES'],
          ['末地 END', 'THE_END']
        ]), 'BIOME')
      this.appendValueInput('WEIGHT')
        .setCheck('Number')
        .appendField('权重: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#9C27B0')
    }
  },
  register_ore_feature: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册矿物生成')
      this.appendValueInput('BLOCK')
        .setCheck('String')
        .appendField('方块: ')
      this.appendValueInput('VEIN_SIZE')
        .setCheck('Number')
        .appendField('矿脉大小: ')
      this.appendValueInput('MAX_Y')
        .setCheck('Number')
        .appendField('最大Y高度: ')
      this.appendValueInput('VEINS_PER_CHUNK')
        .setCheck('Number')
        .appendField('每区块矿脉数: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#3F51B5')
    }
  },
  ore_configuration: {
    init: function() {
      this.appendDummyInput()
        .appendField('矿物配置')
      this.appendValueInput('COUNT')
        .setCheck('Number')
        .appendField('数量: ')
      this.appendValueInput('SIZE')
        .setCheck('Number')
        .appendField('大小: ')
      this.setOutput(true, 'OreConfiguration')
      this.setColour('#3F51B5')
    }
  },
  world_gen_event: {
    init: function() {
      this.appendDummyInput()
        .appendField('世界生成事件')
      this.appendStatementInput('CODE')
        .appendField('执行: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#3F51B5')
    }
  },
  event_on_block_break: {
    init: function() {
      this.appendDummyInput()
        .appendField('当方块被破坏时')
      this.appendStatementInput('CODE')
        .appendField('执行: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#F44336')
    }
  },
  event_on_entity_join: {
    init: function() {
      this.appendDummyInput()
        .appendField('当实体加入世界时')
      this.appendStatementInput('CODE')
        .appendField('执行: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#F44336')
    }
  },
  event_on_item_use: {
    init: function() {
      this.appendDummyInput()
        .appendField('当物品被使用时')
      this.appendStatementInput('CODE')
        .appendField('执行: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#F44336')
    }
  },
  event_on_tick: {
    init: function() {
      this.appendDummyInput()
        .appendField('每游戏刻时')
      this.appendDummyInput()
        .appendField('触发: ')
        .appendField(new Blockly.FieldDropdown([
          ['客户端', 'CLIENT'],
          ['服务器', 'SERVER'],
          ['玩家', 'PLAYER']
        ]), 'SIDE')
      this.appendStatementInput('CODE')
        .appendField('执行: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#F44336')
    }
  },
  event_subscribe: {
    init: function() {
      this.appendDummyInput()
        .appendField('订阅事件')
      this.appendValueInput('EVENT_NAME')
        .setCheck('String')
        .appendField('事件名: ')
      this.appendStatementInput('CODE')
        .appendField('处理: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#F44336')
    }
  },
  register_enchantment: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册附魔')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendValueInput('MAX_LEVEL')
        .setCheck('Number')
        .appendField('最大等级: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00BCD4')
    }
  },
  register_potion: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册药水效果')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendValueInput('DURATION')
        .setCheck('Number')
        .appendField('持续时间(刻): ')
      this.appendValueInput('AMPLIFIER')
        .setCheck('Number')
        .appendField('等级: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00BCD4')
    }
  },
  enchantment_effect: {
    init: function() {
      this.appendDummyInput()
        .appendField('附魔效果')
      this.appendValueInput('ENCHANTMENT')
        .setCheck('String')
        .appendField('附魔: ')
      this.appendStatementInput('EFFECT_CODE')
        .appendField('触发效果: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00BCD4')
    }
  },
  register_recipe: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册配方')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('配方名称: ')
      this.appendValueInput('RESULT')
        .setCheck('String')
        .appendField('结果物品: ')
      this.appendValueInput('COUNT')
        .setCheck('Number')
        .appendField('数量: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#E91E63')
    }
  },
  shapeless_recipe: {
    init: function() {
      this.appendDummyInput()
        .appendField('无序合成配方')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('配方名: ')
      this.appendValueInput('RESULT')
        .setCheck('String')
        .appendField('结果: ')
      this.appendValueInput('INGREDIENTS')
        .setCheck('Array')
        .appendField('原料: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#E91E63')
    }
  },
  shaped_recipe: {
    init: function() {
      this.appendDummyInput()
        .appendField('有序合成配方')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('配方名: ')
      this.appendValueInput('PATTERN')
        .setCheck('String')
        .appendField('图案: ')
      this.appendValueInput('RESULT')
        .setCheck('String')
        .appendField('结果: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#E91E63')
    }
  },
  register_menu: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册菜单容器')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendValueInput('TITLE')
        .setCheck('String')
        .appendField('标题: ')
      this.appendValueInput('SLOTS')
        .setCheck('Number')
        .appendField('槽位数: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FF5722')
    }
  },
  menu_slot: {
    init: function() {
      this.appendDummyInput()
        .appendField('添加物品槽')
      this.appendValueInput('X')
        .setCheck('Number')
        .appendField('X: ')
      this.appendValueInput('Y')
        .setCheck('Number')
        .appendField('Y: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FF5722')
    }
  },
  player_inv_access: {
    init: function() {
      this.appendDummyInput()
        .appendField('访问玩家背包')
      this.appendStatementInput('CODE')
        .appendField('操作: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FF5722')
    }
  },
  register_network_channel: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册网络通道')
      this.appendValueInput('CHANNEL_NAME')
        .setCheck('String')
        .appendField('通道名: ')
      this.appendValueInput('PROTOCOL_VERSION')
        .setCheck('String')
        .appendField('协议版本: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FF6F00')
    }
  },
  send_packet_to_server: {
    init: function() {
      this.appendDummyInput()
        .appendField('发送数据包到服务器')
      this.appendValueInput('CHANNEL')
        .setCheck('String')
        .appendField('通道: ')
      this.appendValueInput('DATA')
        .setCheck('String')
        .appendField('数据: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FF6F00')
    }
  },
  send_packet_to_client: {
    init: function() {
      this.appendDummyInput()
        .appendField('发送数据包到客户端')
      this.appendValueInput('CHANNEL')
        .setCheck('String')
        .appendField('通道: ')
      this.appendValueInput('DATA')
        .setCheck('String')
        .appendField('数据: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FF6F00')
    }
  },
  handle_packet: {
    init: function() {
      this.appendDummyInput()
        .appendField('处理数据包')
      this.appendValueInput('CHANNEL')
        .setCheck('String')
        .appendField('通道: ')
      this.appendStatementInput('CODE')
        .appendField('处理代码: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FF6F00')
    }
  },
  network_message: {
    init: function() {
      this.appendDummyInput()
        .appendField('网络消息')
      this.appendValueInput('MESSAGE')
        .setCheck('String')
        .appendField('消息: ')
      this.setOutput(true, 'NetworkMessage')
      this.setColour('#FF6F00')
    }
  },
  spawn_particle: {
    init: function() {
      this.appendDummyInput()
        .appendField('生成粒子效果')
      this.appendValueInput('PARTICLE_TYPE')
        .setCheck('ParticleType')
        .appendField('粒子类型: ')
      this.appendValueInput('X')
        .setCheck('Number')
        .appendField('X: ')
      this.appendValueInput('Y')
        .setCheck('Number')
        .appendField('Y: ')
      this.appendValueInput('Z')
        .setCheck('Number')
        .appendField('Z: ')
      this.appendValueInput('COUNT')
        .setCheck('Number')
        .appendField('数量: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FFAB00')
    }
  },
  particle_type: {
    init: function() {
      this.appendDummyInput()
        .appendField('粒子类型: ')
        .appendField(new Blockly.FieldDropdown([
          ['火焰 FLAME', 'FLAME'],
          ['烟 SMOKE', 'SMOKE'],
          ['心 HEART', 'HEART'],
          ['音符 NOTE', 'NOTE'],
          ['传送门 PORTAL', 'PORTAL'],
          ['附魔 ENCHANT', 'ENCHANT'],
          ['爆炸 EXPLOSION', 'EXPLOSION'],
          ['龙息 DRAGON_BREATH', 'DRAGON_BREATH'],
          ['蘑菇孢子 SPORE', 'SPORE'],
          ['气泡 BUBBLE', 'BUBBLE']
        ]), 'TYPE')
      this.setOutput(true, 'ParticleType')
      this.setColour('#FFAB00')
    }
  },
  particle_config: {
    init: function() {
      this.appendDummyInput()
        .appendField('粒子配置')
      this.appendValueInput('SPEED_X')
        .setCheck('Number')
        .appendField('速度X: ')
      this.appendValueInput('SPEED_Y')
        .setCheck('Number')
        .appendField('速度Y: ')
      this.appendValueInput('SPEED_Z')
        .setCheck('Number')
        .appendField('速度Z: ')
      this.setOutput(true, 'ParticleConfig')
      this.setColour('#FFAB00')
    }
  },
  particle_at_block: {
    init: function() {
      this.appendDummyInput()
        .appendField('在方块位置生成粒子')
      this.appendValueInput('BLOCK_POS')
        .setCheck('String')
        .appendField('方块位置: ')
      this.appendValueInput('PARTICLE_TYPE')
        .setCheck('ParticleType')
        .appendField('粒子类型: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FFAB00')
    }
  },
  particle_ring: {
    init: function() {
      this.appendDummyInput()
        .appendField('粒子环效果')
      this.appendValueInput('CENTRE_X')
        .setCheck('Number')
        .appendField('中心X: ')
      this.appendValueInput('CENTRE_Y')
        .setCheck('Number')
        .appendField('中心Y: ')
      this.appendValueInput('CENTRE_Z')
        .setCheck('Number')
        .appendField('中心Z: ')
      this.appendValueInput('RADIUS')
        .setCheck('Number')
        .appendField('半径: ')
      this.appendValueInput('PARTICLE_TYPE')
        .setCheck('ParticleType')
        .appendField('粒子: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FFAB00')
    }
  },
  play_sound: {
    init: function() {
      this.appendDummyInput()
        .appendField('播放声音')
      this.appendValueInput('SOUND_EVENT')
        .setCheck('SoundEvent')
        .appendField('声音事件: ')
      this.appendValueInput('VOLUME')
        .setCheck('Number')
        .appendField('音量: ')
      this.appendValueInput('PITCH')
        .setCheck('Number')
        .appendField('音调: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00C853')
    }
  },
  register_sound_event: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册声音事件')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00C853')
    }
  },
  sound_at_player: {
    init: function() {
      this.appendDummyInput()
        .appendField('在玩家位置播放声音')
      this.appendValueInput('PLAYER')
        .setCheck('String')
        .appendField('玩家: ')
      this.appendValueInput('SOUND')
        .setCheck('SoundEvent')
        .appendField('声音: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00C853')
    }
  },
  sound_at_block: {
    init: function() {
      this.appendDummyInput()
        .appendField('在方块位置播放声音')
      this.appendValueInput('BLOCK_POS')
        .setCheck('String')
        .appendField('方块位置: ')
      this.appendValueInput('SOUND')
        .setCheck('SoundEvent')
        .appendField('声音: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00C853')
    }
  },
  custom_sound_config: {
    init: function() {
      this.appendDummyInput()
        .appendField('自定义声音配置')
      this.appendValueInput('SOUND_NAME')
        .setCheck('String')
        .appendField('声音文件名: ')
      this.appendDummyInput()
        .appendField('类别: ')
        .appendField(new Blockly.FieldDropdown([
          ['方块 BLOCK', 'BLOCK'],
          ['环境 AMBIENT', 'AMBIENT'],
          ['音乐 MUSIC', 'MUSIC'],
          ['玩家 PLAYER', 'PLAYER'],
          ['敌对生物 HOSTILE', 'HOSTILE'],
          ['友好生物 NEUTRAL', 'NEUTRAL']
        ]), 'CATEGORY')
      this.setOutput(true, 'SoundConfig')
      this.setColour('#00C853')
    }
  },
  register_advancement: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册进度')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendValueInput('DISPLAY')
        .setCheck('AdvancementDisplay')
        .appendField('显示: ')
      this.appendValueInput('CRITERIA')
        .setCheck('AdvancementCriteria')
        .appendField('条件: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FF6D00')
    }
  },
  advancement_criteria: {
    init: function() {
      this.appendDummyInput()
        .appendField('进度条件')
      this.appendValueInput('ITEM')
        .setCheck('String')
        .appendField('需要物品: ')
      this.appendDummyInput()
        .appendField('触发: ')
        .appendField(new Blockly.FieldDropdown([
          ['获得物品 INVENTORY_CHANGED', 'INVENTORY_CHANGED'],
          ['击杀生物 ENTITY_KILLED', 'ENTITY_KILLED'],
          ['合成物品 ITEM_CRAFTED', 'ITEM_CRAFTED'],
          ['进入维度 CHANGED_DIMENSION', 'CHANGED_DIMENSION'],
          ['任意 IMPOSSIBLE', 'IMPOSSIBLE']
        ]), 'TRIGGER')
      this.setOutput(true, 'AdvancementCriteria')
      this.setColour('#FF6D00')
    }
  },
  advancement_reward: {
    init: function() {
      this.appendDummyInput()
        .appendField('进度奖励')
      this.appendValueInput('EXPERIENCE')
        .setCheck('Number')
        .appendField('经验值: ')
      this.appendValueInput('LOOT_TABLE')
        .setCheck('String')
        .appendField('战利品表: ')
      this.setOutput(true, 'AdvancementReward')
      this.setColour('#FF6D00')
    }
  },
  grant_advancement: {
    init: function() {
      this.appendDummyInput()
        .appendField('授予进度')
      this.appendValueInput('PLAYER')
        .setCheck('String')
        .appendField('玩家: ')
      this.appendValueInput('ADVANCEMENT')
        .setCheck('String')
        .appendField('进度: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FF6D00')
    }
  },
  advancement_display: {
    init: function() {
      this.appendDummyInput()
        .appendField('进度显示信息')
      this.appendValueInput('TITLE')
        .setCheck('String')
        .appendField('标题: ')
      this.appendValueInput('DESCRIPTION')
        .setCheck('String')
        .appendField('描述: ')
      this.appendValueInput('ICON_ITEM')
        .setCheck('String')
        .appendField('图标物品: ')
      this.appendDummyInput()
        .appendField('背景: ')
        .appendField(new Blockly.FieldDropdown([
          ['任务 TASK', 'TASK'],
          ['目标 GOAL', 'GOAL'],
          ['挑战 CHALLENGE', 'CHALLENGE']
        ]), 'FRAME')
      this.setOutput(true, 'AdvancementDisplay')
      this.setColour('#FF6D00')
    }
  },
  register_data_component: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册数据组件')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendValueInput('DEFAULT_VALUE')
        .setCheck('String')
        .appendField('默认值: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#304FFE')
    }
  },
  data_component_type: {
    init: function() {
      this.appendDummyInput()
        .appendField('数据组件类型: ')
        .appendField(new Blockly.FieldDropdown([
          ['整数 INT', 'INT'],
          ['浮点 FLOAT', 'FLOAT'],
          ['字符串 STRING', 'STRING'],
          ['布尔 BOOLEAN', 'BOOLEAN'],
          ['物品堆 ITEM_STACK', 'ITEM_STACK'],
          ['NBT标签 NBT', 'NBT']
        ]), 'TYPE')
      this.setOutput(true, 'DataComponentType')
      this.setColour('#304FFE')
    }
  },
  set_data_component: {
    init: function() {
      this.appendDummyInput()
        .appendField('设置数据组件值')
      this.appendValueInput('ITEM')
        .setCheck('String')
        .appendField('物品: ')
      this.appendValueInput('COMPONENT')
        .setCheck('String')
        .appendField('组件: ')
      this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField('值: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#304FFE')
    }
  },
  get_data_component: {
    init: function() {
      this.appendDummyInput()
        .appendField('获取数据组件值')
      this.appendValueInput('ITEM')
        .setCheck('String')
        .appendField('物品: ')
      this.appendValueInput('COMPONENT')
        .setCheck('String')
        .appendField('组件: ')
      this.setOutput(true, 'String')
      this.setColour('#304FFE')
    }
  },
  data_component_value: {
    init: function() {
      this.appendDummyInput()
        .appendField('数据组件值')
      this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField('值: ')
      this.setOutput(true, 'DataComponentValue')
      this.setColour('#304FFE')
    }
  },
  register_tag: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册标签')
      this.appendValueInput('TAG_NAME')
        .setCheck('String')
        .appendField('标签名: ')
      this.appendDummyInput()
        .appendField('标签类型: ')
        .appendField(new Blockly.FieldDropdown([
          ['方块 BLOCK', 'BLOCK'],
          ['物品 ITEM', 'ITEM'],
          ['实体 ENTITY_TYPE', 'ENTITY_TYPE'],
          ['流体 FLUID', 'FLUID']
        ]), 'TAG_TYPE')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00BFA5')
    }
  },
  block_tag: {
    init: function() {
      this.appendDummyInput()
        .appendField('方块标签')
      this.appendValueInput('TAG_NAME')
        .setCheck('String')
        .appendField('标签名: ')
      this.appendValueInput('BLOCK')
        .setCheck('String')
        .appendField('方块: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00BFA5')
    }
  },
  item_tag: {
    init: function() {
      this.appendDummyInput()
        .appendField('物品标签')
      this.appendValueInput('TAG_NAME')
        .setCheck('String')
        .appendField('标签名: ')
      this.appendValueInput('ITEM')
        .setCheck('String')
        .appendField('物品: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00BFA5')
    }
  },
  entity_type_tag: {
    init: function() {
      this.appendDummyInput()
        .appendField('实体类型标签')
      this.appendValueInput('TAG_NAME')
        .setCheck('String')
        .appendField('标签名: ')
      this.appendValueInput('ENTITY')
        .setCheck('String')
        .appendField('实体: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#00BFA5')
    }
  },
  tag_check: {
    init: function() {
      this.appendDummyInput()
        .appendField('检查标签')
      this.appendValueInput('TAG_NAME')
        .setCheck('String')
        .appendField('标签名: ')
      this.appendValueInput('TARGET')
        .setCheck('String')
        .appendField('目标: ')
      this.setOutput(true, 'Boolean')
      this.setColour('#00BFA5')
    }
  },
  register_structure: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册结构')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendDummyInput()
        .appendField('类型: ')
        .appendField(new Blockly.FieldDropdown([
          ['普通结构 NORMAL', 'NORMAL'],
          ['拼图结构 JIGSAW', 'JIGSAW'],
          ['模板结构 TEMPLATE', 'TEMPLATE']
        ]), 'STRUCT_TYPE')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#D500F9')
    }
  },
  structure_placement: {
    init: function() {
      this.appendDummyInput()
        .appendField('设置结构放置规则')
      this.appendValueInput('STRUCTURE')
        .setCheck('String')
        .appendField('结构: ')
      this.appendDummyInput()
        .appendField('生物群系: ')
        .appendField(new Blockly.FieldDropdown([
          ['平原 PLAINS', 'PLAINS'],
          ['沙漠 DESERT', 'DESERT'],
          ['森林 FOREST', 'FOREST'],
          ['针叶林 TAIGA', 'TAIGA'],
          ['沼泽 SWAMP', 'SWAMP'],
          ['雪原 SNOWY_PLAINS', 'SNOWY_PLAINS'],
          ['山地 MOUNTAINS', 'MOUNTAINS'],
          ['下界 NETHER_WASTES', 'NETHER_WASTES']
        ]), 'BIOME')
      this.appendValueInput('SPACING')
        .setCheck('Number')
        .appendField('间距: ')
      this.appendValueInput('SEPARATION')
        .setCheck('Number')
        .appendField('分离: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#D500F9')
    }
  },
  structure_jigsaw: {
    init: function() {
      this.appendDummyInput()
        .appendField('拼图结构配置')
      this.appendValueInput('TEMPLATE_POOL')
        .setCheck('String')
        .appendField('模板池: ')
      this.appendValueInput('MAX_DEPTH')
        .setCheck('Number')
        .appendField('最大深度: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#D500F9')
    }
  },
  structure_template: {
    init: function() {
      this.appendDummyInput()
        .appendField('结构模板')
      this.appendValueInput('TEMPLATE_NAME')
        .setCheck('String')
        .appendField('模板名: ')
      this.setOutput(true, 'StructureTemplate')
      this.setColour('#D500F9')
    }
  },
  structure_feature: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册结构特征')
      this.appendValueInput('NAME')
        .setCheck('String')
        .appendField('名称: ')
      this.appendValueInput('STRUCTURE')
        .setCheck('StructureTemplate')
        .appendField('结构模板: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#D500F9')
    }
  },
  register_villager_trade: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册村民交易')
      this.appendValueInput('PROFESSION')
        .setCheck('String')
        .appendField('职业: ')
      this.appendValueInput('LEVEL')
        .setCheck('Number')
        .appendField('等级: ')
      this.appendValueInput('OFFER')
        .setCheck('TradeOffer')
        .appendField('交易: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FFD600')
    }
  },
  trade_item: {
    init: function() {
      this.appendDummyInput()
        .appendField('交易物品')
      this.appendValueInput('ITEM')
        .setCheck('String')
        .appendField('物品: ')
      this.appendValueInput('COUNT')
        .setCheck('Number')
        .appendField('数量: ')
      this.setOutput(true, 'TradeItem')
      this.setColour('#FFD600')
    }
  },
  trade_offer: {
    init: function() {
      this.appendDummyInput()
        .appendField('交易报价')
      this.appendValueInput('INPUT1')
        .setCheck('TradeItem')
        .appendField('输入1: ')
      this.appendValueInput('INPUT2')
        .setCheck('TradeItem')
        .appendField('输入2: ')
      this.appendValueInput('RESULT')
        .setCheck('TradeItem')
        .appendField('结果: ')
      this.appendValueInput('MAX_USES')
        .setCheck('Number')
        .appendField('最大使用次数: ')
      this.appendValueInput('XP_REWARD')
        .setCheck('Number')
        .appendField('经验奖励: ')
      this.setOutput(true, 'TradeOffer')
      this.setColour('#FFD600')
    }
  },
  wandering_trader_trade: {
    init: function() {
      this.appendDummyInput()
        .appendField('流浪商人交易')
      this.appendValueInput('OFFER')
        .setCheck('TradeOffer')
        .appendField('交易: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#FFD600')
    }
  },
  trade_config: {
    init: function() {
      this.appendDummyInput()
        .appendField('交易配置')
      this.appendValueInput('PRICE_MULTIPLIER')
        .setCheck('Number')
        .appendField('价格倍率: ')
      this.appendValueInput('DEMAND')
        .setCheck('Number')
        .appendField('需求: ')
      this.setOutput(true, 'TradeConfig')
      this.setColour('#FFD600')
    }
  },
  register_command: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册命令')
      this.appendValueInput('COMMAND_NAME')
        .setCheck('String')
        .appendField('命令名: ')
      this.appendValueInput('ARGUMENTS')
        .setCheck('CommandArgument')
        .appendField('参数: ')
      this.appendStatementInput('CODE')
        .appendField('执行: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#DD2C00')
    }
  },
  command_argument: {
    init: function() {
      this.appendDummyInput()
        .appendField('命令参数')
      this.appendValueInput('ARG_NAME')
        .setCheck('String')
        .appendField('参数名: ')
      this.appendDummyInput()
        .appendField('类型: ')
        .appendField(new Blockly.FieldDropdown([
          ['字符串 STRING', 'STRING'],
          ['整数 INTEGER', 'INTEGER'],
          ['浮点数 FLOAT', 'FLOAT'],
          ['布尔 BOOLEAN', 'BOOLEAN'],
          ['玩家 ENTITY', 'ENTITY'],
          ['方块位置 BLOCK_POS', 'BLOCK_POS']
        ]), 'ARG_TYPE')
      this.setOutput(true, 'CommandArgument')
      this.setColour('#DD2C00')
    }
  },
  command_execute: {
    init: function() {
      this.appendDummyInput()
        .appendField('执行命令')
      this.appendValueInput('COMMAND')
        .setCheck('String')
        .appendField('命令: ')
      this.appendValueInput('SOURCE')
        .setCheck('String')
        .appendField('来源: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#DD2C00')
    }
  },
  command_permission: {
    init: function() {
      this.appendDummyInput()
        .appendField('命令权限')
      this.appendValueInput('COMMAND_NAME')
        .setCheck('String')
        .appendField('命令: ')
      this.appendValueInput('PERMISSION_LEVEL')
        .setCheck('Number')
        .appendField('权限等级: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#DD2C00')
    }
  },
  command_feedback: {
    init: function() {
      this.appendDummyInput()
        .appendField('命令反馈')
      this.appendValueInput('MESSAGE')
        .setCheck('String')
        .appendField('消息: ')
      this.appendDummyInput()
        .appendField('颜色: ')
        .appendField(new Blockly.FieldDropdown([
          ['白色 WHITE', 'WHITE'],
          ['红色 RED', 'RED'],
          ['绿色 GREEN', 'GREEN'],
          ['金色 GOLD', 'GOLD'],
          ['蓝色 AQUA', 'AQUA']
        ]), 'COLOR')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#DD2C00')
    }
  },
  register_dimension: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册维度')
      this.appendValueInput('DIM_NAME')
        .setCheck('String')
        .appendField('维度名: ')
      this.appendValueInput('DIM_TYPE')
        .setCheck('DimensionType')
        .appendField('维度类型: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#6200EA')
    }
  },
  dimension_type: {
    init: function() {
      this.appendDummyInput()
        .appendField('维度类型')
      this.appendValueInput('FIXED_TIME')
        .setCheck('Number')
        .appendField('固定时间: ')
      this.appendDummyInput()
        .appendField('是否有天空: ')
        .appendField(new Blockly.FieldCheckbox(true), 'HAS_SKYLIGHT')
      this.appendDummyInput()
        .appendField('是否有天花板: ')
        .appendField(new Blockly.FieldCheckbox(false), 'HAS_CEILING')
      this.appendDummyInput()
        .appendField('是否超平坦: ')
        .appendField(new Blockly.FieldCheckbox(false), 'ULTRA_WARM')
      this.appendValueInput('BRIGHTNESS')
        .setCheck('Number')
        .appendField('亮度: ')
      this.setOutput(true, 'DimensionType')
      this.setColour('#6200EA')
    }
  },
  dimension_biome: {
    init: function() {
      this.appendDummyInput()
        .appendField('设置维度生物群系')
      this.appendValueInput('DIMENSION')
        .setCheck('String')
        .appendField('维度: ')
      this.appendValueInput('BIOME')
        .setCheck('String')
        .appendField('群系: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#6200EA')
    }
  },
  dimension_teleport: {
    init: function() {
      this.appendDummyInput()
        .appendField('传送到维度')
      this.appendValueInput('DIMENSION')
        .setCheck('String')
        .appendField('目标维度: ')
      this.appendValueInput('X')
        .setCheck('Number')
        .appendField('X: ')
      this.appendValueInput('Y')
        .setCheck('Number')
        .appendField('Y: ')
      this.appendValueInput('Z')
        .setCheck('Number')
        .appendField('Z: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#6200EA')
    }
  },
  register_block_renderer: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册方块渲染器')
      this.appendValueInput('BLOCK')
        .setCheck('String')
        .appendField('方块: ')
      this.appendValueInput('RENDER_TYPE')
        .setCheck('RenderType')
        .appendField('渲染类型: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#0091EA')
    }
  },
  register_entity_renderer: {
    init: function() {
      this.appendDummyInput()
        .appendField('注册实体渲染器')
      this.appendValueInput('ENTITY')
        .setCheck('String')
        .appendField('实体: ')
      this.appendValueInput('MODEL')
        .setCheck('String')
        .appendField('模型: ')
      this.appendValueInput('TEXTURE')
        .setCheck('String')
        .appendField('贴图路径: ')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour('#0091EA')
    }
  },
  render_type: {
    init: function() {
      this.appendDummyInput()
        .appendField('渲染类型: ')
        .appendField(new Blockly.FieldDropdown([
          ['固体 SOLID', 'SOLID'],
          ['透明 TRANSLUCENT', 'TRANSLUCENT'],
          ['切割 CUTOUT', 'CUTOUT'],
          ['切割遮罩 CUTOUT_MIPPED', 'CUTOUT_MIPPED'],
          ['发光 GLOWING', 'GLOWING']
        ]), 'TYPE')
      this.setOutput(true, 'RenderType')
      this.setColour('#0091EA')
    }
  },
  custom_model: {
    init: function() {
      this.appendDummyInput()
        .appendField('自定义模型')
      this.appendValueInput('MODEL_PATH')
        .setCheck('String')
        .appendField('模型路径: ')
      this.appendValueInput('TEXTURE_PATH')
        .setCheck('String')
        .appendField('贴图路径: ')
      this.setOutput(true, 'CustomModel')
      this.setColour('#0091EA')
    }
  }
}

export function registerAllBlocks(Blockly) {
  for (const [blockName, blockDef] of Object.entries(BLOCK_DEFINITIONS)) {
    Blockly.Blocks[blockName] = blockDef
  }
}

export function registerCustomBlocks(Blockly, customBlocks) {
  for (const customBlock of customBlocks) {
    Blockly.Blocks['custom_' + customBlock.id] = {
      init: function() {
        const colour = customBlock.color || '#FFD600'
        let input = this.appendDummyInput()
        input.appendField(customBlock.name)
        
        if (customBlock.parameters) {
          for (const param of customBlock.parameters) {
            if (param.type === 'input') {
              const valueInput = this.appendValueInput(param.name)
                .setCheck(param.check || null)
                .appendField(param.label + ': ')
            } else if (param.type === 'dropdown') {
              this.appendDummyInput()
                .appendField(param.label + ': ')
                .appendField(new Blockly.FieldDropdown(param.options), param.name)
            } else if (param.type === 'text') {
              this.appendDummyInput()
                .appendField(param.label + ': ')
                .appendField(new Blockly.FieldTextInput(param.default || ''), param.name)
            }
          }
        }

        if (customBlock.hasStatement) {
          this.appendStatementInput('CODE')
            .appendField('执行: ')
        }

        this.setColour(colour)
        this.setTooltip(customBlock.description || '自定义积木')
        
        if (customBlock.isOutput) {
          this.setOutput(true, customBlock.outputType || null)
        } else {
          this.setPreviousStatement(true, null)
          this.setNextStatement(true, null)
        }
      }
    }
  }
}

export function buildToolboxXML(customBlocks = []) {
  let xml = '<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">'
  
  for (const category of BLOCK_CATEGORIES) {
    if (category.id === 'custom') {
      if (customBlocks.length > 0) {
        xml += `<category name="${category.name}" colour="${category.color}">`
        for (const cb of customBlocks) {
          xml += `<block type="custom_${cb.id}"></block>`
        }
        xml += '</category>'
      }
    } else {
      xml += `<category name="${category.name}" colour="${category.color}">`
      for (const blockType of category.blocks) {
        xml += `<block type="${blockType}"></block>`
      }
      xml += '</category>'
    }
  }
  
  xml += '</xml>'
  return xml
}