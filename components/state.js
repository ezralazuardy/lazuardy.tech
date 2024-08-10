const state = {
  top: 0,
  pages: 0,
  threshold: 4,
  mouse: [0, 0],
  content: [
    {
      text: `We are a team full of talented engineers.`,
      images: ["/images/3.jpg", "/images/1.jpg", "/images/2.jpg"],
    },
    {
      text: `That empower companies pursue their success,`,
      images: [
        "/images/c4cA8UN.jpg",
        "/images/ajQ73ol.jpg",
        "/images/gZOmLNU.jpg",
      ],
    },
    {
      text: `through technologies and the power of internet.`,
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
      // text: "With us, built a software that outstands others.",
      text: "1 Patent, an International Research Publication, a bookful of articles, and bunch of portfolios. Yeah we know our stuff.",
      image: "/images/cAKwexj.jpg",
    },
    {
      depth: -4,
      textColor: "#272727",
      text: "Artifical Intelligence, Big Data, Cloud, Network, Frontend, Backend, Cybersecurity, Web 3, Database, or others? Mention it, We'll do it.",
      image: "/images/04zTfWB.jpg",
    },
  ],
  lines: [
    {
      points: [
        [-20, 0, 0],
        [-12, 0, 0],
      ],
      color: "black",
      lineWidth: 0.5,
    },
    {
      points: [
        [20, 0, 0],
        [12, 0, 0],
      ],
      color: "black",
      lineWidth: 0.5,
    },
  ],
};

export default state;
