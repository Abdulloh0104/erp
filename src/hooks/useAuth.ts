import { useMutation} from "@tanstack/react-query";
import { authService } from "@service";
import { type SignIn } from "@types";

export const useAuth=()=>{
    return useMutation({
        mutationFn:async({data,role}:{data:SignIn; role:string})=>authService.signIn(data,role)
    })
}

export const useAuthLogOut = () => {  
    return useMutation({
        mutationFn:async({role}:{role:string})=>authService.signOut(role)
    })
}