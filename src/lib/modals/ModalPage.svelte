<script>
  import { createEventDispatcher } from "svelte";
  import { addContact, fullName, emailInput, numberInput } from "../db";

  export let open = false;
  export let title = "";

  //   export let email = "";
  //   export let number = "";
  //   export let user_id = "";

  //   export let createPost = () => {};

  export const submitData = () => {
    dispatch("close");
  };

  const dispatch = createEventDispatcher();
</script>

{#if open}
  <div
    class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"
  >
    <div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
    <div
      class="bg-white w-full lg:h-max lg:w-1/2  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"
    >
      <div
        class="flex justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold"
      >
        {title}

        <button
          class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
          on:click={() => dispatch("close")}
        >
          x
        </button>
      </div>
      <form
        style="padding:5%"
        on:submit|preventDefault={() =>
          addContact($fullName, $emailInput, $numberInput)}
      >
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Full name</label
            >
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
              bind:value={$fullName}
            />
          </div>

          <div>
            <label
              for="phone"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Phone number</label
            >
            <input
              type="tel"
              id="phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123-45-678"
              required
              bind:value={$numberInput}
            />
          </div>
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email address</label
          >
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
            bind:value={$emailInput}
          />
        </div>

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Submit</button
        >
      </form>
      <!-- <button
        class="p-2 bg-green-200 hover:bg-gray-300 ml-4"
        style="margin-bottom:5px"
        on:click={() => createPost()}
      >
        Submit
      </button> -->
    </div>
  </div>
{/if}
