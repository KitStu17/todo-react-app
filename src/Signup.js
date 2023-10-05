import React from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import Send from "@material-ui/icons/Send";
import { signup } from "./service/ApiService";
import { useState } from "react";
import { sendEmail, checkCertificateCode } from "./service/ApiService";

function SignUp() {
  const [checkEmail, setCheckEmail] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    signup({ email: email, username: username, password: password }).then(
      (response) => {
        window.location.href = "/login";
      }
    );
  };

  const handleEmailSend = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    sendEmail(email);
  };

  const handleCheckCode = (event) => {
    event.preventDefault();
    const code = document.getElementById("code").value;
    checkCertificateCode(code).then(() => {
      setCheckEmail(true);
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Typography component="h1" variant="h5">
          계정 생성
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
              id="username"
              label="사용자 이름"
              name="username"
              autoComplete="username"
              autoFocus
            />
          </Grid>
          <Grid container spacing={12} style={{ alignItems: "center" }}>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                startIcon={<Send />}
                style={{ height: 40, marginLeft: 5 }}
                onClick={handleEmailSend}
              />
            </Grid>
          </Grid>
          <Grid container spacing={12} style={{ alignItems: "center" }}>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="code"
                label="인증코드"
                name="code"
                autoComplete="code"
                autoFocus
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                startIcon={<Send />}
                style={{ height: 40, marginLeft: 5 }}
                onClick={handleCheckCode}
              />
            </Grid>
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
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              계정 생성
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              이미 계정이 있습니까? 로그인 하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUp;
