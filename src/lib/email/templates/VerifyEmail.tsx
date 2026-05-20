import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { emailStyles } from "./_styles";

interface VerifyEmailProps {
  name: string;
  url: string;
}

export function VerifyEmail({ name, url }: VerifyEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Confirme seu email pra entrar no Núcleo.</Preview>
      <Body style={emailStyles.body}>
        <Container style={emailStyles.container}>
          <Text style={emailStyles.label}>Núcleo</Text>
          <Heading style={emailStyles.heading}>Confirme seu email</Heading>
          <Text style={emailStyles.text}>
            Olá, <span style={emailStyles.textStrong}>{name}</span>. Pra ativar sua conta no Núcleo,
            confirme seu email no link abaixo. O link é válido por 24h.
          </Text>
          <Button href={url} style={emailStyles.button}>
            Confirmar email
          </Button>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.text}>
            Se o botão não funcionar, copie e cole a URL no navegador:
          </Text>
          <Link href={url} style={emailStyles.link}>
            {url}
          </Link>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.footer}>
            Você recebeu este email porque iniciou um cadastro no Núcleo. Se não foi você, pode
            ignorar — nada será criado.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default VerifyEmail;
