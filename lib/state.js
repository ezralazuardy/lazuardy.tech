const state = {
  top: 0,
  pages: 0,
  threshold: 4,
  mouse: [0, 0],
  content: [
    {
      text: `We are a team full\nof talented engineers.`,
      images: ["/images/3.jpg", "/images/1.jpg", "/images/2.jpg"],
    },
    {
      text: `That empower companies pursue their success,`,
      images: ["/images/4.jpg", "/images/5.jpg", "/images/6.jpg"],
    },
    {
      text: `through technologies and the power of internet.`,
      images: ["/images/7.jpg", "/images/8.jpg", "/images/9.jpg"],
    },
  ],
  depthbox: [
    {
      depth: 0,
      text: "One patent, an international research publication, a bookful of articles, and bunch of portfolios. Yeah, we know our stuff.",
      image: "/images/cover.jpg",
    },
    {
      depth: -4,
      text: "Artifical Intelligence, Big Data, Cloud, Network, Frontend, Backend, Cybersecurity, Web 3, Database, or others? Mention it, we'll do it.",
      image: "/images/cover.jpg",
    },
  ],
  lines: [
    {
      points: [
        [-20, 0, 0],
        [-12, 0, 0],
      ],
      color: "white",
      lineWidth: 0.5,
    },
    {
      points: [
        [20, 0, 0],
        [12, 0, 0],
      ],
      color: "white",
      lineWidth: 0.5,
    },
  ],
};

export default state;