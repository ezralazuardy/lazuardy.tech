const state = {
  top: 0,
  pages: 0,
  threshold: 4,
  mouse: [0, 0],
  content: [
    {
      tag: "",
      text: `We are a team full of\ntalented engineers.`,
      images: [
        "/images/BH41NVu.jpg",
        "/images/fBoIJLX.jpg",
        "/images/04zTfWB.jpg",
      ],
    },
    {
      tag: "",
      text: `That empower companies\npursue their success,`,
      images: [
        "/images/c4cA8UN.jpg",
        "/images/ajQ73ol.jpg",
        "/images/gZOmLNU.jpg",
      ],
    },
    {
      tag: "",
      text: `through technologies,\nand the power of internet.`,
      images: [
        "/images/mbFIW1b.jpg",
        "/images/mlDUVig.jpg",
        "/images/gwuZrgo.jpg",
      ],
    },
  ],
  depthbox: [
    {
      depth: 0,
      color: "#cccccc",
      textColor: "#ffffff",
      text: "Seeking digital help?\nWe're here to help you\nbuild a software that\noutstands others.",
      image: "/images/cAKwexj.jpg",
    },
    {
      depth: -5,
      textColor: "#272727",
      text: "Artifical Intelligence, Big Data, Cloud, Network, Frontend, Backend, Cybersecurity, Web 3,\nor others? Mention it, We'll do it.",
      image: "/images/04zTfWB.jpg",
    },
  ],
  lines: [
    {
      points: [
        [-20, 0, 0],
        [-9, 0, 0],
      ],
      color: "black",
      lineWidth: 0.5,
    },
    {
      points: [
        [20, 0, 0],
        [9, 0, 0],
      ],
      color: "black",
      lineWidth: 0.5,
    },
  ],
};

export default state;
