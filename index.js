function createStore()
{

    let store;
    let listeners= []

    let subscribe = (listener)=> {
        listeners.push(listener);

        return ()=>{
            listeners = listeners.filter( (l)=> l!==listener);
        }
    }


    return{
        store,
        subscribe
    }
}