import { signin } from "./service/ApiService";
import {
  Button,
  TextField,
  Grid,
  Link,
  Container,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");

    // ApiService의 signin 메소드로 login
    signin({ email: email, password: password }).catch((error) => {
      setErrorMsg("로그인에 실패하셨습니다. 비밀번호를 다시 입력해 주세요.");
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        {" "}
        {/* submit 버튼 클릭 시 handleSubmit 실행 */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              label="패스워드"
              name="password"
              autoComplete="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
          <Link href="/signup" variant="body2">
            <Grid item>계정이 없습니까? 여기서 가입하세요.</Grid>
          </Link>
          <Grid item xs={12} style={{ color: "#FF0000" }}>
            {errorMsg}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Login;
