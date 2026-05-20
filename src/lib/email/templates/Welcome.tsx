import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import { emailStyles } from "./_styles";

interface WelcomeProps {
  name: string;
  dashboardUrl: string;
}

export function Welcome({ name, dashboardUrl }: WelcomeProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Você entrou no Núcleo.</Preview>
      <Body style={emailStyles.body}>
        <Container style={emailStyles.container}>
          <Text style={emailStyles.label}>Núcleo</Text>
          <Heading style={emailStyles.heading}>Você entrou no Núcleo, {name}.</Heading>
          <Text style={emailStyles.text}>
            Sistema é o que sobra quando a motivação acaba. O cockpit operacional ainda está sendo
            construído — você está entrando antes da maior parte do produto existir.
          </Text>
          <Text style={emailStyles.text}>
            Por enquanto, sua conta está pronta e o dashboard te espera. Updates grandes chegam por
            aqui.
          </Text>
          <Button href={dashboardUrl} style={emailStyles.button}>
            Ir para o dashboard
          </Button>
        </Container>
      </Body>
    </Html>
  );
}

export default Welcome;
