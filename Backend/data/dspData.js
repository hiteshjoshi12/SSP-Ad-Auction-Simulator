module.exports = [
    {
      id: "DSP_A",
      targeting: { geo: "US", device: "mobile" },
      bidLogic: (geo, device) => geo === "US" && device === "mobile" ? 3.5 : 1,
      creative: {
        image_url: "https://example.com/ad1.jpg",
        click_url: "https://example.com/landing1"
      }
    },
    {
      id: "DSP_B",
      targeting: { geo: "US", device: "desktop" },
      bidLogic: (geo, device) => geo === "US" && device === "desktop" ? 3.2 : 1.2,
      creative: {
        image_url: "https://example.com/ad2.jpg",
        click_url: "https://example.com/landing2"
      }
    },
    {
      id: "DSP_C",
      targeting: { geo: "IN", device: "mobile" },
      bidLogic: (geo, device) => geo === "IN" && device === "mobile" ? 2.8 : 1,
      creative: {
        image_url: "https://example.com/ad3.jpg",
        click_url: "https://example.com/landing3"
      }
    }
  ];
  