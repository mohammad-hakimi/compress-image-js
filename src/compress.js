export class Compress {
    static MIME_JPG = 'image/jpg';
    static MIME_PNG = 'image/png';
    static MIME_WEBP = 'image/webp';
    static MIME_TIF = 'image/tif';
    static MIME_ALL_IMAGE = 'image/*';

    /**
     * Creates a new instance of compressor that can be used for processing any image.
     * @param {[number, number]} size The output image dimensions e.g. [width, height].
     * @param {number} quality The output image quality. Quality should be between 0 and 1;
     * @param {string} mime_type The output image mime type (extension) e.g. image/jpg, image/png, etc. The default is webp.
     *
     * */
    constructor(size = [2500, 2500], quality = .8, mime_type = Compress.MIME_WEBP) {
        this.size = size;
        this.quality = quality;
        this.mime_type = mime_type;
    }

    /**
     * Process on the given image and returns blob and dataUrl of the compressed image.
     * @param {string} image The processing image.
     *
     * */
    process(image) {
        return new Promise((resolve, reject) => {
            if (this.mime_type !== Compress.MIME_PNG &&
                this.mime_type !== Compress.MIME_JPG &&
                this.mime_type !== Compress.MIME_WEBP &&
                this.mime_type !== Compress.MIME_TIF &&
                this.mime_type !== Compress.MIME_ALL_IMAGE
            ) {
                reject("Invalid mime type.")
            }
            if (this.quality > 1 || this.quality < 0) {
                reject("Invalid quality.")
            }
            if (!Array.isArray(this.size) || typeof this.size?.[0] !== "number" || typeof this.size?.[1] !== "number") {
                reject("Invalid size.")
            }
            const i = new Image();
            i.src = image;
            const c = document.createElement('canvas');
            i.onerror = () => {
                reject('Failed!');
            };
            i.onload = () => {
                const ctx = c.getContext('2d');
                c.width = this.size[0];
                c.height = this.size[1];
                if (ctx) {
                    ctx.drawImage(i, 0, 0, c.width, c.height);
                    c.toBlob(
                        (blob) => {
                            blob &&
                            resolve({
                                blob: blob,
                                dataUrl: c.toDataURL(this.mime_type, this.quality),
                            });
                            !blob && reject('Failed!');
                        },
                        this.mime_type,
                        this.quality
                    );
                }
            };
        });
    }

}