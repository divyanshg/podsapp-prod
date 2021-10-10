const createCollage = require("photo-collage");

const options = {
  sources: [
    'https://images.unsplash.com/photo-1569219420570-273beaf1c05a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1569296226058-3b57006d13fd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1569910730959-c9f8a6c3f006?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    'https://images.unsplash.com/photo-1571125280192-0ba531bd355a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
  ],
  width: 2, // number of images per row
  height: 2, // number of images per column
  imageWidth: 35, // width of each image
  imageHeight: 25, // height of each image
  backgroundColor: "#cccccc", // optional, defaults to black.
  spacing: 0, // optional: pixels between each image
};

createCollage(options)
  .then((canvas) => {
    const src = canvas.jpegStream();
    const dest = fs.createWriteStream("myFile");
    src.pipe(dest);
  });