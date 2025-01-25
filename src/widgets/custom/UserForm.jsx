import { TextInputLabel } from '../textInputs';

export function UserForm({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
}) {
    return (
        <>
            <TextInputLabel
                label="Username"
                placeholder="Username"
                value={username}
                onValueChange={setUsername}
            />
            <TextInputLabel
                label="Email"
                placeholder="email@example.com"
                value={email}
                onValueChange={setEmail}
            />
            <TextInputLabel
                label="Password"
                placeholder="Password"
                value={password}
                onValueChange={setPassword}
                type="password"
            />
        </>
    );
}

export default UserForm;
