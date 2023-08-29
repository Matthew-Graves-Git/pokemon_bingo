const calcDelay = (offset) => {
    switch(offset % 5){
        case 0:
            return 'animation-delay-[50ms]'
        case 1:
            return 'animation-delay-[100ms]'
        case 2:
            return 'animation-delay-[150ms]'
        case 3:
            return 'animation-delay-[200ms]'
        case 4:
            return 'animation-delay-[250ms]' 
        default:
            return 'animation-delay-[500ms]'
    }
}
 
export {calcDelay};