import Popup from "reactjs-popup";


export const popCenter=(trigger, content, setState, setClose)=>{
    return <Popup trigger={trigger} onOpen={setState} onClose={setClose}modal className="popCenter">    
                {close => (
                    <div className="popup">
                        <button className="close" onClick={close}>          
                            &times;        
                        </button>
                        {content}
                        <button className="close" onClick={close}>          
                            Close      
                        </button>
                    </div>
                )}
            </Popup>
};

export const popLeft=(trigger, content, setState, setClose, doClose)=>{

    return <Popup trigger={trigger} position="bottom left"  onOpen={setState} onClose={setClose}>
                {close => {
                        if(doClose){
                            close();
                        }
                        return <div>
                                    {content}
                                </div>
                    }
                }
            </Popup>;
};