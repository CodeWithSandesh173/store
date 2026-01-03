const products = {
    // Topups
    "pubg": {
        id: "pubg",
        type: "topup",
        name: "Pubg Mobile (UC)",
        image: "Images/pubg.png",
        description: "Instant UC Topup directly to your Player ID.",
        category: "Games",
        requirements: ["Player ID"],
        packages: [
            { label: "60 UC", price: 170 },
            { label: "120 UC", price: 325 },
            { label: "180 UC", price: 490 },
            { label: "325 UC", price: 800 },
            { label: "385 UC", price: 935 },
            { label: "660 UC", price: 1495 },
            { label: "720 UC", price: 1665 },
            { label: "985 UC", price: 2235 },
            { label: "1800 UC", price: 3730 }
        ]
    },
    "freefire": {
        id: "freefire",
        type: "topup",
        name: "Free Fire (Diamonds)",
        image: "Images/freefire.png",
        description: "Fast Diamond Topup via Player ID.",
        category: "Games",
        requirements: ["Player ID"],
        packages: [
            { label: "115 Diamonds", price: 160 },
            { label: "240 Diamonds", price: 235 },
            { label: "610 Diamonds", price: 620 },
            { label: "1240 Diamonds", price: 1140 }
        ]
    },
    // Giftcards
    "steam": {
        id: "steam",
        type: "code",
        name: "Steam Giftcard",
        image: "Images/steam.png",
        description: "Wallet Code for Steam Store.",
        category: "Gift Cards",
        requirements: ["Email (delivery)"],
        packages: [
            { label: "2 USD", price: 525 },
            { label: "5 USD", price: 895 },
            { label: "10 USD", price: 1730 },
            { label: "15 USD", price: 2595 },
            { label: "20 USD", price: 3395 }
        ]
    },
    "itunes": {
        id: "itunes",
        type: "code",
        name: "iTunes Giftcard",
        image: "Images/itunes.png",
        description: "Apple Store & iTunes Gift Card.",
        category: "Gift Cards",
        requirements: ["Email (delivery)"],
        packages: [
            { label: "5 USD", price: 805 },
            { label: "10 USD", price: 1610 },
            { label: "20 USD", price: 3250 }
        ]
    },
    // Subscriptions
    "spotify": {
        id: "spotify",
        type: "subscription",
        name: "Spotify Premium",
        image: "Images/spotify.png",
        description: "Ad-free music listening.",
        category: "Subscriptions",
        requirements: ["Email (delivery)"],
        packages: [
            { label: "Individual 12 Months", price: 3150 }
        ]
    },
    "discord": {
        id: "discord",
        type: "subscription",
        name: "Discord Nitro",
        image: "Images/discord.png",
        description: "Enhance your Discord experience.",
        category: "Subscriptions",
        requirements: ["Email (delivery)"],
        packages: [
            { label: "Basic 1 Month", price: 580 },
            { label: "Basic 12 Months", price: 5225 },
            { label: "Nitro (w/ Boosts) 1 Month", price: 1600 },
            { label: "Nitro (w/ Boosts) 1 Year", price: 15500 }
        ]
    },
    "netflix": {
        id: "netflix",
        type: "subscription",
        name: "Netflix",
        image: "Images/netflix.png",
        description: "Watch TV shows & movies.",
        category: "Subscriptions",
        requirements: ["Email (delivery)"],
        packages: [
            { label: "1 Month (1 Screen)", price: 670 },
            { label: "1 Month (2 Screen)", price: 1320 },
            { label: "1 Month (3 Screen)", price: 2000 }
        ]
    },
    // Game Keys
    "gtav": {
        id: "gtav",
        type: "key",
        name: "GTA V",
        image: "Images/gta.png",
        description: "Grand Theft Auto V PC Key.",
        category: "Games",
        requirements: ["Email (delivery)"],
        packages: [
            { label: "Standard Edition", price: 2505 },
            { label: "Premium Edition", price: 2605 }
        ]
    },
    "minecraft": {
        id: "minecraft",
        type: "key",
        name: "Minecraft",
        image: "Images/minecraft.png",
        description: "Java + Bedrock Edition PC.",
        category: "Games",
        requirements: ["Email (delivery)"],
        packages: [
            { label: "Standard Edition", price: 4000 }
        ]
    },
    "godofwar": {
        id: "godofwar",
        type: "key",
        name: "God of War",
        image: "Images/godofwar.png",
        description: "Steam Version PC Key.",
        category: "Games",
        requirements: ["Email (delivery)"],
        packages: [
            { label: "Steam Key", price: 6000 }
        ]
    }
};
