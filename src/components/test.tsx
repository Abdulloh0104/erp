interface DropdawnType {
  open: Boolean;
  arr: string;
  toogle:()=> void;
}

const MyTitle = ({open,arr,toogle}:DropdawnType) => {
  
    const onSubmit=()=>{
        toogle()
        if(open==true){
            return(
                <>
                <h1>`${arr}`</h1>
                </>
            )
        }else if(open==false){
            return;
        }
    }
  
    return <button onClick={()=>onSubmit()}></button>;
};

export default MyTitle;
