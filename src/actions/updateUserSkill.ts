'use server';

import { supabaseServerClient} from "@/utils/supabaseServer";

const updateUserSkill = async (userId: string, skill: string) =>{
    const supabase = await supabaseServerClient();

    //Actualiza registro de usuario
    const {data: formResponse, error: formError} = await supabase.rpc(
        'add_skill', 
        {
            user_id: userId,
            new_skill: skill,
        }
    );
    return [formResponse, formError]; 
};

export default updateUserSkill;

