<script>
  import supabase from "$lib/db";
  import { contacts, getContacts, deleteContact } from "$lib/db";
  import { showAlert, ALERT_TYPE } from "$lib/alerts/alertStore";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import ModalPage from "../lib/modals/ModalPage.svelte";
  import { Modals, closeModal } from "svelte-modals";

  import { openModal } from "svelte-modals";
  import ModalComponent from "../lib/modals/ModalComponent.svelte";

  let email = "";
  let full_name = "";
  let isComplted = false;
  let loading = false;
  let open_modal = false;

  const signOut = async () => {
    console.log("signout");
    try {
      loading = true;
      let { error } = await supabase.auth.signOut();
      goto("/login");
      if (error) throw error;
    } catch (error) {
      message = { success: false, display: error.message };
    } finally {
      loading = false;
    }
  };

  const handleCheckbox = (id) => {
    isComplted = !isComplted;
    console.log("isComplted", isComplted);
    updateContact(id);
  };

  onMount(async () => {
    if (!supabase.auth.user()) {
      goto("/login");
    } else {
      getContacts();
    }
    console.log(supabase.auth.user(), "hello");
  });

  const handleModal = () => {
    console.log("handleModal");
    open_modal = !open_modal;
  };

  function handleClick() {
    openModal(ModalComponent, {
      title: "Title of the Modal",
      message: "This is an alert using Svelte-Modal",
    });
  }
  function handleClickEdit(id, fullName, email, number) {
    console.log("handleClickEdit", id, fullName, email, number);

    openModal(ModalComponent, {
      title: "Title of the Modal",
      message: "This is an alert using Svelte-Modal",
      name: email,
      email: fullName,
      number: number,
      id: id,
    });
  }
</script>

<Modals>
  <div slot="svelte-modal" on:close={handleModal()} />
</Modals>
<!-- <button
  class="rounded bg-blue-500 py-2 px-2 text-white font-bold"
  on:click={handleClick}
>
  Open Alert
</button> -->

<ModalPage
  title="Add Contact"
  open={open_modal}
  on:close={() => handleModal()}
/>
<div>
  <div>
    <!-- <h1 class="text-3xl font-bold underline">Contacts</h1>
    <input type="text" bind:value={email} placeholder="email" />
    <input type="text" bind:value={full_name} placeholder="full_name" /> -->
    <!-- <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      on:click={addContact}
    >
      Add Contact
    </button> -->

    <button
      type="button"
      on:click={() => handleClick()}
      class="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
      >Add Post</button
    >

    <button
      class="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out"
      on:click={signOut}>Logout</button
    >
  </div>
</div>
<div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-center">
          <thead class="border-b bg-gray-800">
            <tr>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                Number
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                Full Name
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                Email
              </th>
              <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                --
              </th>
            </tr>
          </thead>
          <tbody>
            {#if $contacts.length != 0}
              {#each $contacts as contact}
                <tr class="bg-white border-b">
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <input
                      type="checkbox"
                      bind:checked={isComplted}
                      on:click={handleCheckbox(contact.number)}
                    />{contact.number}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {contact.email}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap {isComplted
                      ? 'checked'
                      : ''}"
                  >
                    {contact.full_name}
                    {contact.number}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  >
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      on:click={() => {
                        deleteContact(contact.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      on:click={() => {
                        handleClickEdit(
                          contact.id,
                          contact.full_name,
                          contact.email,
                          contact.number
                        );
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              {/each}
            {:else}
              <tr class="bg-white border-b">
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                  colspan="4"
                >
                  No Contacts
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<style>
  .checked {
    text-decoration: line-through;
  }
</style>
