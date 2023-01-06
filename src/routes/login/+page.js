export const load = async () => {
    return{
        product:'sampot nimo'
    }
}

const signUp = async () => {
    console.log("singup");
    console.log("email", email);
    try {
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (user) {
        goto("./");
      }
      console.log("user", user);
      console.log("session", session);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };