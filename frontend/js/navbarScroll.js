document.addEventListener('DOMContentLoaded', function(){ 
    var myElement = document.querySelector("header");
    // construct an instance of Headroom, passing the element
    var headroom  = new Headroom(myElement);
    headroom.init();

    generateVirtualMargin("header", "#repel-header");

}, false);


// Maintains a virtual Dynamic Margin-Bottom for a fixed
// positioned navbar by adding Margin-Top to a static element
function generateVirtualMargin(target, identifierID) {
    let container = document.querySelector(target);

    let p = document.querySelector(identifierID);    // Getting the margin-top value of #repel-header
    let _style = p.currentStyle || window.getComputedStyle(p);
    let marginTop = _style.marginTop;
    marginTop = marginTop.replace ( /[^\d.]/g, '' );
    marginTop = parseInt(marginTop);

    // Dynamically Applying the MarginTop
    document.querySelector(identifierID).style.marginTop = (container.clientHeight + marginTop) + "px";
    new ResizeSensor(container, function() {
        document.querySelector(identifierID).style.marginTop = (container.clientHeight + marginTop) + "px";
    });
}

// Source: https://stackoverflow.com/a/47965966/7800641
function ResizeSensor(element, callback) {
    let zIndex = parseInt(getComputedStyle(element));
    if(isNaN(zIndex)) { zIndex = 0; };
    zIndex--;

    let expand = document.createElement('div');
    expand.style.position = "absolute";
    expand.style.left = "0px";
    expand.style.top = "0px";
    expand.style.right = "0px";
    expand.style.bottom = "0px";
    expand.style.overflow = "hidden";
    expand.style.zIndex = zIndex;
    expand.style.visibility = "hidden";

    let expandChild = document.createElement('div');
    expandChild.style.position = "absolute";
    expandChild.style.left = "0px";
    expandChild.style.top = "0px";
    expandChild.style.width = "10000000px";
    expandChild.style.height = "10000000px";
    expand.appendChild(expandChild);

    let shrink = document.createElement('div');
    shrink.style.position = "absolute";
    shrink.style.left = "0px";
    shrink.style.top = "0px";
    shrink.style.right = "0px";
    shrink.style.bottom = "0px";
    shrink.style.overflow = "hidden";
    shrink.style.zIndex = zIndex;
    shrink.style.visibility = "hidden";

    let shrinkChild = document.createElement('div');
    shrinkChild.style.position = "absolute";
    shrinkChild.style.left = "0px";
    shrinkChild.style.top = "0px";
    shrinkChild.style.width = "200%";
    shrinkChild.style.height = "200%";
    shrink.appendChild(shrinkChild);

    element.appendChild(expand);
    element.appendChild(shrink);

    function setScroll()
    {
        expand.scrollLeft = 10000000;
        expand.scrollTop = 10000000;

        shrink.scrollLeft = 10000000;
        shrink.scrollTop = 10000000;
    };
    setScroll();

    let size = element.getBoundingClientRect();

    let currentWidth = size.width;
    let currentHeight = size.height;

    let onScroll = function()
    {
        let size = element.getBoundingClientRect();

        let newWidth = size.width;
        let newHeight = size.height;

        if(newWidth != currentWidth || newHeight != currentHeight)
        {
            currentWidth = newWidth;
            currentHeight = newHeight;

            callback();
        }

        setScroll();
    };

    expand.addEventListener('scroll', onScroll);
    shrink.addEventListener('scroll', onScroll);
};