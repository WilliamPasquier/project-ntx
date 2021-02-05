// GPU Product database
const gpuProducts = [
    {
        name: 'SpeedCore 60',
        frequency: 1800,
        vrReady: true,
        memoryType: 'GDDR7',
        capacity: 8,
        memorySpeed: 16,
        interface: 'PCIe 3.0x16',
        connections: '2x HDMI, 3x DisplayPort',
        cooling: 'Actif',
        consumption: 200,
        use: ['Gaming', 'Streaming', 'Vidéo', '3D'],
        price: '329.90',
        id: 'speedcore-60'           
    },
    {
        name: 'SpeedCore 70',
        frequency:2000,
        memoryType: 'GDDR7',
        capacity: 12,
        memorySpeed: 16,
        interface: 'PCIe 3.0x16',
        connections: '2x HDMI, 3x DisplayPort',
        cooling: 'Actif',
        consumption: 220,
        use: ['Gaming', 'Streaming', 'Vidéo', '3D'],
        price: '409.90',
        id: 'speedcore-70'
    },
    {
        name: 'SpeedCore 80',
        frequency: 2400,
        memoryType: 'GDDR7',
        capacity: 16,
        memorySpeed: 16,
        interface: 'PCIe 3.0x16',
        connections: '2x HDMI, 3x DisplayPort',
        cooling: 'Actif',
        consumption: 245,
        use: ['Gaming', 'Streaming', 'Vidéo', '3D'],
        price: '579.90',
        id: 'speedcore-80'         
    },
    {
        name: 'SpeedCore 80X',  
        frequency: 2800,
        memoryType: 'GDDR7',
        capacity: 20,
        memorySpeed: 16,
        interface: 'PCIe 3.0x16',
        connections: '2x HDMI, 3x DisplayPort',
        cooling: 'Actif',
        consumption: 250,
        use: ['Gaming', 'Streaming', 'Vidéo', '3D'],
        price: '639.90',
        id: 'speedcore-80x'
    },
    {
        name: 'SpeedCore Colossale Edition',
        frequency: 3200,
        memoryType: 'GDDR7',
        capacity: 24,
        memorySpeed: 16,
        interface: 'PCIe 3.0x16',
        connections: '2x HDMI, 3x DisplayPort',
        cooling: 'Actif',
        consumption: 265,
        use: ['Gaming', 'Streaming', 'Vidéo', '3D'],
        price: '709.90',
        id: 'speedcore-colossal-edition'
    },
];

module.exports = gpuProducts;