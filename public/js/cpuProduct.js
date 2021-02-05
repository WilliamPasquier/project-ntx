// CPU product database
const cpuProducts = [
    {
        name: 'Howl 3',
        baseFrequency: 3.2,
        boostFrequency: 4.0,
        isUnlocked: true,
        cache: 8,
        coreNumber: 8,
        threadNumber: 16,
        socket: 'H4X',
        consumption: 85,
        isCoolingIncluded: false,
        use: ['Gaming', 'Streaming', 'Vidéo', '3D', 'Bureautique'],
        support: 64,
        price: '259.90',
        id: 'howl-3'
    },
    {
        name: 'Howl 5',
        baseFrequency: 3.5,
        boostFrequency: 4.7,
        isUnlocked: true,
        cache: 16,
        coreNumber: 16,
        threadNumber: 24,
        socket: 'H4X',
        consumption: 90,
        isCoolingIncluded: false,
        use: ['Gaming', 'Streaming', 'Vidéo', '3D', 'Bureautique'],
        support: 64,
        price: '359.90',
        id: 'howl-5'
    },
    {
        name: 'Howl 7',
        baseFrequency: 3.8,
        boostFrequency: 5.1,
        isUnlocked: true,
        cache: 32,
        coreNumber: 16,
        threadNumber: 32,
        socket: 'H4X',
        consumption: 95,
        isCoolingIncluded: false,
        use: ['Gaming', 'Streaming', 'Vidéo', '3D', 'Bureautique'],
        support: 64,
        price: '489.90',
        id: 'howl-7'
    },
];

module.exports = cpuProducts;