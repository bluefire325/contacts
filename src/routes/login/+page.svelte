<script>
  import LoginPage from "./loginPage.svelte";

  export let data;
  console.log(data);
</script>

<p>{data.product}</p>
<LoginPage />
