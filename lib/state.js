const state = {
  top: 0,
  pages: 0,
  threshold: 4,
  mouse: [0, 0],
  content: [
    {
      text: `We are a team full of\nvisionary engineers.`,
      images: [
        "/images/dev-salahudin.jpg",
        "/images/dev-ezra.jpg",
        "/images/dev-bintang.jpg",
      ],
    },
    {
      text: `That empower companies achieve their success,`,
      images: ["/images/pic-1.jpg", "/images/pic-2.jpg", "/images/pic-3.jpg"],
    },
    {
      text: `through innovative and cutting-edge technologies.`,
      images: ["/images/pic-4.jpg", "/images/pic-5.jpg", "/images/pic-6.jpg"],
    },
  ],
  depthbox: [
    {
      depth: 0,
      text: "One patent, an international research publication, a bookful of articles, and bunch of portfolios. We're driven by innovation, powered by talent.",
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
