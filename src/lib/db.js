import { createClient } from '@supabase/supabase-js'
import { showAlert, ALERT_TYPE } from "$lib/alerts/alertStore";
import { closeModal } from "svelte-modals";
import { writable } from "svelte/store";


// export  let open_modal = writable(false); 
export const contacts = writable([]);
export const fullName = writable('');
export const emailInput = writable('');
export const numberInput = writable('');
export const Imageurl = writable();
export const files = writable();



// export const handleModal = (open) => {
//   open ? open_modal.set(true) :
//   open_modal.set(false)
// };

export const getContacts = async () => {

  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("contact_owner", supabase.auth.user().id);

  if(error){
    contacts.set(data);
  }else{
    contacts.set(data);
  }

};

const downloadImage = async (path,number) => {
  
  const { data,error } = supabase
  .storage
  .from('contacts')
  .getPublicUrl(path.split('/')[1])

  if(error){
    alert(error)
  }else{
    console.log(data,'halooo')
    const {  error } = await supabase
    .from('contacts')
    .update({ img_url: data.publicURL })
    .eq('number', number)
    getContacts()
  }
  getContacts()
  
};

export const uploadAvatar = async (files,number) => {
 

    if (!files || files.length === 0) {
      throw new Error("You must select an image to upload.");
    }
    const file = files[0];
    let { data,error } = await supabase.storage
      .from("contacts")
      .upload(file.name , file);
    if (error) {
      throw error;
    }else{
      downloadImage(data.Key,number)

    }

 
};


export const addContact = async (full_name, email, number, id,imgUrl) => {
  console.log("addContact");
  console.log(email, full_name, number,imgUrl)
  if(id){
    console.log(id,'hi')

    const { data, error } = await supabase
    .from('contacts')
    .update({ email: email,
      full_name: full_name,
      number: number,
      img_url:imgUrl })
    .eq('id', id)
    showAlert("Contact Edited successfully", ALERT_TYPE.SUCCESS, 2500);
      fullName.set('');
      emailInput.set('');
      numberInput.set('');
      getContacts()
      closeModal()

  }else{
    if (email != "" || full_name != "") {
      const number_data = await supabase
        .from('contacts')
        .select('number')
        .eq('number', number)
      const email_data = await supabase
        .from('contacts')
        .select('email')
        .eq('email', email)
      console.log(number_data, "number_data", email_data, "email_data");
      if(number_data['data'].length > 0 || email_data['data'].length > 0){
          // alert('number already exists')
          closeModal()
          return showAlert("number or email already exists", ALERT_TYPE.DANGER, 2500);
        }
     

      const { data, error } = await supabase.from("contacts").insert([
  
        {
          email: email,
          full_name: full_name,
          contact_owner: supabase.auth.user().id,
          number: number,
          img_url:imgUrl
        },
      ]);
  
      uploadAvatar(imgUrl,number)
      console.log(data)
      closeModal()
      showAlert("Contact added successfully", ALERT_TYPE.SUCCESS, 2500);
      getContacts()
      
      fullName.set('');
      emailInput.set('');
      numberInput.set('');
     
     
  
    } else {
      alert("Please fill the form");
    }
  }

};

export const deleteContact = async (id,url) => {
  const { data, error } = await supabase
    .from("contacts")
    .delete()
    .match({ id: id });
  showAlert("Contact Deleted successfully", ALERT_TYPE.DANGER, 2500);
  getContacts();
};


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default supabase 
