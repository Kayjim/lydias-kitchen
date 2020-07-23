const clearData = (currentSelection, data) => {
    switch (currentSelection) {
        case ('delivery'):
            if(data.pickup)
                delete data.pickup;
            break;
        case ('pickup'):
            if(data.delivery)
                delete data.delivery;
            break;
        case ('zelle'):
            if(data.venmo)
                delete data.venmo;
            if(data.paypal)
                delete data.paypal;
            if(data.cod)
                delete data.cod;
            break;
        case ('venmo'):
            if(data.zelle)
                delete data.zelle;
            if(data.paypal)
                delete data.paypal;
            if(data.cod)
                delete data.cod;
            break;
        case ('paypal'):
            if(data.venmo)
                delete data.venmo;
            if(data.zelle)
                delete data.zelle;
            if(data.cod)
                delete data.cod;
            break;
        case ('cod'):
            if(data.paypal)
                delete data.paypal;
            if(data.venmo)
                delete data.venmo;
            if(data.zelle)
                delete data.zelle;
            break;
    }
    return data;
};

export default clearData;