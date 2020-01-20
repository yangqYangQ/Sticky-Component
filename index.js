class StickyComponent {
    constructor(selector, topSpacing) {
        this.elements = $(selector);
        this.topSpacing = topSpacing || 0;
        this.cacheOffsets();
        this.addWrapper();
        this.listenToScroll();
    }

    cacheOffsets() {
        this.offsets = [];
        this.elements.each((index, element) => {
            this.offsets[index] = $(element).offset();
        });
    }

    addWrapper() {
        this.elements.each((index, element) => {
            $(element).wrap('<div/>');
            $(element).parent().height($(element).outerHeight());
        });
    }

    listenToScroll() {
        $(window).on('scroll', () => {
            this.elements.each((index, element) => {
                if (window.scrollY + this.topSpacing > this.offsets[index].top) {
                    $(element).addClass('sticky')
                        .css({top: this.topSpacing});
                } else {
                    $(element).removeClass('sticky');
                }
            });
        });
    }
}

new StickyComponent('.topbar');
new StickyComponent('button', 110);