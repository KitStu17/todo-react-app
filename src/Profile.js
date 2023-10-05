import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Link,
  Container,
  Typography,
} from "@material-ui/core";

import { call, sendEmail, checkCertificateCode } from "./service/ApiService";
import Send from "@material-ui/icons/Send";

export default function Profile() {
  const [checkEmail, setCheckEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");

  useEffect(() => {
    call("/auth/getUser", "GET", null).then((response) => {
      setEmail(response.email);
      setUserName(response.username);
    });
  }, []);

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

  const updateUser = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    if (username !== "" && email !== "" && password !== "" && checkEmail) {
      call("/auth/updateUser", "PUT", {
        username: username,
        email: email,
        password: password,
      }).then((response) => {
        alert("회원 정보가 정상적으로 수정되었습니다.");
        window.location.href = "/";
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <form noValidate onSubmit={updateUser}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              👨‍🎓 사용자 정보 수정
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label={username}
              placeholder={username}
              autoFocus
            />
          </Grid>
          <Grid container spacing={12} style={{ alignItems: "center" }}>
            <Grid item xs={10}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label={email}
                placeholder={email}
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
              autoComplete="current-password"
              name="password"
              variant="outlined"
              required
              fullWidth
              id="password"
              label="수정 할 패스워드 입력"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              수정 완료
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end"></Grid>
      </form>
    </Container>
  );
}
