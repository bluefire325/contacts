<script>
  import {
    ALERT_TYPE,
    alertType,
    alertMessage,
  } from "/src/lib/alerts/alertStore.js";

  console.log($alertType);
  $: bgClass = (type) => {
    if (type === "SUCCESS") {
      return "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative ";
    } else if (type === "DANGER") {
      return "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative";
    }
  };
</script>

{#if $alertMessage}
  <div class={bgClass($alertType)} role="alert">
    <span class="block sm:inline">{$alertMessage} </span>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3" />
  </div>
{/if}
