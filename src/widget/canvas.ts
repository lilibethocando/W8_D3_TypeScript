export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(width: number, height: number) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d')!;
        // Adding '!' asserts that getContext('2d') will never return null
        // If you're sure the canvas element and its context will always exist, this is safe to use
        // Alternatively, you can add a null check here and handle the case where getContext('2d') returns null
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getContext(): CanvasRenderingContext2D {
        return this.ctx;
    }

    public drawRectangle(x: number, y: number, width: number, height: number, color: string): void {
        // Placeholder method for drawing a rectangle on the canvas
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    // Add other canvas-related methods as needed
}
