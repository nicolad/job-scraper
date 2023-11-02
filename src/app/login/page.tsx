import { PageWrapper } from "./styles";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

async function handleSubmit(data: FormData)  {
  "use server";

  const password = data.get("password")?.toString() || "";

  cookies().set("passwordCookie", password);
  redirect("/admin");
};

export default function Login() {
  return (
    <PageWrapper>
      <h1>Login</h1>
      <p>Please enter your password.</p>
      <form action={handleSubmit}>
        <input
          type="password"
          id="password"
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
    </PageWrapper>
  );
}
