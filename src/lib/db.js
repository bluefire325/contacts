import { createClient } from '@supabase/supabase-js'
import { showAlert, ALERT_TYPE } from "$lib/alerts/alertStore";
import { closeModal } from "svelte-modals";
import { writable } from "svelte/store";

// export  let open_modal = writable(false); 
export const contacts = writable([]);
export const fullName = writable('');
export const emailInput = writable('');
export const numberInput = writable('');



// export const handleModal = (open) => {
//   open ? open_modal.set(true) :
//   open_modal.set(false)
// };

export const getContacts = async () => {
 
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("contact_owner", supabase.auth.user().id);
  console.log(data, "data");
  contacts.set(data);
  console.log(contacts, "contacts");

};



export const addContact = async (email, full_name, number, id) => {
  console.log("addContact");
  console.log(email, full_name, number)
  if(id){
    console.log(id,'hi')

    const { data, error } = await supabase
    .from('contacts')
    .update({ email: email,
      full_name: full_name,
      number: number })
    .eq('id', id)
    showAlert("Contact Edited successfully", ALERT_TYPE.SUCCESS, 2500);
      fullName.set('');
      emailInput.set('');
      numberInput.set('');
      getContacts()
      closeModal()

  }else{
    if (email != "" || full_name != "") {
      fullName.set(full_name);
      emailInput.set(email);
      numberInput.set(number);
      console.log(supabase.auth.user().id, 'data');
      const { data, error } = await supabase.from("contacts").insert([
  
        {
          email: email,
          full_name: full_name,
          contact_owner: supabase.auth.user().id,
          number: number
        },
      ]);
  
      
      showAlert("Contact added successfully", ALERT_TYPE.SUCCESS, 2500);
      fullName.set('');
      emailInput.set('');
      numberInput.set('');
      getContacts()
      closeModal()
  
    } else {
      alert("Please fill the form");
    }
  }

};

export const deleteContact = async (id) => {
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
