import getUserData from '@/actions/getUserData';
import getUserImage from '@/actions/getUserImage';
import updateUserSkill from '@/actions/updateUserSkill';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const Profile = async () => {
  const userData = await getUserData();

  if(!userData){
    return redirect('/');
  }

  const userLogo = await getUserImage(userData?.logo!);

  const handleAddSkill = async (formData: FormData) => {
    'use server';

    const skill = formData.get('skill');
    
    if (!skill) return;

    const [formResponse, formError] = await updateUserSkill(
      userData?.id!, 
      skill as string
    );

    if(!formError){
      console.log(formError);
      return;
    }
   
    revalidatePath('/profile');
  };

  return (
    <div className='bg-blue-100 min-h-screen'>
      <div className='container mx-auto py-8'>
        <div className='grid grid-cols-4 sm:grid-cols-12 gap-6 px-4'>
          <div className='col-span-4 sm:col-span-3'>
            <div className='bg-white shadow rounded-lg p-6'>
              <div className='flex flex-col items-center'>
                <img
                  src={userLogo}
                  className='w-32 h-32 bg-gray-300 object-cover rounded-full mb-4 shrink-0'
                  alt={userData?.full_name}
                />
                <h1 className='text-xl font-bold'>{userData?.full_name}</h1>
                <p className='text-gray-700'>{userData?.job_title}</p>
                <div className='mt-6 flex flex-wrap gap-4 justify-center'>
                  <a
                    href='#'
                    className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
                  >
                    Contacto
                  </a>
                  <a
                    href='#'
                    className='bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded'
                  >
                    Currículum
                  </a>
                </div>
              </div>
              <hr className='my-6 border-t border-gray-300' />
              <div className='flex flex-col'>
                <form action={handleAddSkill} className='flex'>
                  <input
                    className='border mr-2 rounded-md border-blue px-3 py-2'
                    type='text'
                    name='skill'
                    placeholder='skill'
                  />
                  <Button type='submit'>Agregar</Button>
                </form>
                <span className='text-gray-700 uppercase font-bold tracking-wider mb-2'>
                  Habilidades
                </span>
                <ul>
                  {userData?.skills.map(skill =>(
                    <li key={skill} className='mb-2'>
                      {skill}
                    </li>
                  ))}
                  
                </ul>
              </div>
            </div>
          </div>
          <div className='col-span-4 sm:col-span-9'>
            <div className='bg-white shadow rounded-lg p-6'>
              <h2 className='text-xl font-bold mb-4'>¡Bienvenidos!</h2>
              
              <p className='text-gray-700'>
              En nuestro sitio, conectamos a talentosos desarrolladores con 
              oportunidades emocionantes. ¿Cuál es nuestro objetivo? 
              ¡Facilitar la búsqueda de talento y fomentar la colaboración! 
              Aquí, los desarrolladores pueden registrarse, crear sus perfiles
              y cargar información relevante sobre sus habilidades, experiencia 
              y proyectos anteriores. Nuestro enfoque es ayudar a las empresas a 
              encontrar a los candidatos adecuados y a los desarrolladores a 
              descubrir nuevas oportunidades.
              </p>
              <div className='mb-6'>
                
                <p className='mt-2'>
                Además, ofrecemos herramientas de búsqueda avanzada para que 
                los reclutadores encuentren rápidamente a los profesionales 
                que necesitan. Así que, si eres un apasionado del código, 
                ¡únete a nuestra comunidad y muestra al mundo lo que puedes hacer!
                </p>
              </div>
            </div>

            <div className='py-4' />

            <div className='col-span-4 sm:col-span-9'>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
