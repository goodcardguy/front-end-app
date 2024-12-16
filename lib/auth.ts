import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

type User = {
  id: string;
  name: string;
  email: string;
  userName: string;
  password: string;
};

const users: Record<string, User> = {
  Douglas: {
    id: '17',
    name: 'Douglas',
    email: 'dlguyett@gmail.com',
    userName: 'Douglas',
    password: 'password123'
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      // console.log('user86', user)
      console.log('token87', token)
      // //console.log('session88', session)

      // const supabase = getSupabase();

      // const { data, error } = await supabase
      //   .from('users')
      //   .select()
      //   .eq('id', token.id);
      // if (error) {
      //   console.error('error', error);
      // }
      // // //console.log('data', data)
      // if (data) {
      //   user = data[0];
      // }

      // if (session?.user && token?.id) {
      //   session.user.id = String(token.id);
      // } else if (user?.id) {
      //   session.user.id = user.id;
      // }
      const newUser = {'id':token.id as string}

      session.user = { ...session.user, ...newUser };
      return session;
    },
    jwt({ token, profile }) {
      // //console.log('Checking 456', profile)
      // //console.log('Checking 456', token)
      if (profile) {
        token.id = profile.id
        token.image = profile.avatar_url || profile.picture
      }
      if (!token.id && token.sub) {
        token.id = token.sub
      }
      // //console.log("token58", token)
      return token
    },
  },
  providers: [
    GitHub,
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        userName: { label: 'userName', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // //console.log('res', res)
        const { userName, password } = credentials;

        console.log('user', userName);
        console.log('password', password);

        // Ensure that `userName` is a valid string
        if (typeof userName !== 'string') {
          return null;
        }

        // Check if the user exists in the dictionary
        const user = users[userName];
        if (!user) {
          return null; // Return null if userName is not found
        }

        // Check if the password matches
        if (user.password !== password) {
          return null; // Return null if password does not match
        }
        console.log('logged in!');
        // Return the user if both checks pass
        return user;
      }
    })
  ]
});
