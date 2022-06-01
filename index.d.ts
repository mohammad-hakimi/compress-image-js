
declare module 'compress-image-js' {
    class Compress {
        constructor(size: [number, number], quality: number, mime_type: string);
        process(image: string): {blob: Blob, dataUrl: string};
    }
}
