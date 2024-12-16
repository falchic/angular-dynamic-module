import { ChangeDetectorRef, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { LoadingSpinnerComponent } from '@shared/loading-spinner/loading-spinner.component';

const NO_BACKGROUND = 'transparent';
const FULL_BACKGROUND = 'opaque';
const SEMI_BACKGROUND = 'semi-opaque';
const OVERLAY_CLASS = 'loading-shade';

@Directive({
    selector: '[appIsLoading]',
    standalone: true
})
export class LoadingDirective implements OnChanges {
    @Input('appIsLoading')
    isLoading = false;

    @Input('background')
    background: 'transparent' | 'semi' | 'full' = 'semi';

    protected overlayElement!: HTMLDivElement;
    protected spinnerElement!: HTMLDivElement;
    protected hostElement!: HTMLDivElement;

    constructor(
        protected readonly elementRef: ElementRef,
        protected readonly renderer: Renderer2,
        protected readonly changeDetectorRef: ChangeDetectorRef,
        protected readonly viewContainerRef: ViewContainerRef,
    ) {
        this.hostElement = this.elementRef.nativeElement;
        this.hostElement.style.position = 'relative';
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.overlayElement || !this.spinnerElement) {
            this.init();
        }

        if (changes['isLoading']) {
            const isLoadingValue = changes['isLoading'].currentValue;

            if (isLoadingValue) {
                this.addLoadingIndicator();
            }
            else {
                this.removeLoadingIndicator();
            }

            this.changeDetectorRef.markForCheck();
        }
    }

    protected addLoadingIndicator(): void {
        this.renderer.appendChild(this.hostElement, this.overlayElement);
        this.renderer.appendChild(this.overlayElement, this.spinnerElement);
    }

    protected removeLoadingIndicator(): void {
        this.renderer.removeChild(this.overlayElement, this.spinnerElement);
        this.renderer.removeChild(this.hostElement, this.overlayElement);
        this.viewContainerRef.clear();
    }

    protected init(): void {
        this.initOverlayElement();
        this.initSpinnerComponent();
    }

    protected initSpinnerComponent(): void {
        const spinnerComponent = this.viewContainerRef.createComponent(LoadingSpinnerComponent);
        this.spinnerElement = spinnerComponent.location.nativeElement;
    }

    protected initOverlayElement(): void {
        this.overlayElement = this.renderer.createElement('div');
        this.renderer.addClass(this.overlayElement, OVERLAY_CLASS);
        switch (this.background) {
            case 'full':
                this.renderer.addClass(this.overlayElement, FULL_BACKGROUND);
                break;
            case 'semi':
                this.renderer.addClass(this.overlayElement, SEMI_BACKGROUND);
                break;
            case 'transparent':
                this.renderer.addClass(this.overlayElement, NO_BACKGROUND);
                break;
            default:
                break;
        }
    }
}
