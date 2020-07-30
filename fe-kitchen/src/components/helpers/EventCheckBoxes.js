const turnOffOtherOptions = (currentBoxChecked, data) => {
    switch (currentBoxChecked) {
        case ('oneBox'):
            data.twoBox = false;
            data.threeBox = false;
            data.fourBox = false;
            break;
        case ('twoBox'):
            data.oneBox = false;
            data.threeBox = false;
            data.fourBox = false;
            break;
        case ('threeBox'):
            data.twoBox = false;
            data.oneBox = false;
            data.fourBox = false;
            break;
        case ('fourBox'):
            data.twoBox = false;
            data.threeBox = false;
            data.oneBox = false;
            break;
    }
    return data;
}

export default turnOffOtherOptions;