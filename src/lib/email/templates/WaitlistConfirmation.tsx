import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import { emailStyles } from "./_styles";

interface WaitlistConfirmationProps {
  email: string;
}

/**
 * Confirmação de entrada na lista de espera. Conectado na S0.6
 * (`joinWaitlist` server action).
 */
export function WaitlistConfirmation({ email }: WaitlistConfirmationProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Você entrou na lista de espera do Núcleo.</Preview>
      <Body style={emailStyles.body}>
        <Container style={emailStyles.container}>
          <Text style={emailStyles.label}>Núcleo</Text>
          <Heading style={emailStyles.heading}>Você entrou na lista.</Heading>
          <Text style={emailStyles.text}>
            Confirmado: <span style={emailStyles.textStrong}>{email}</span> está na lista de espera
            do Núcleo. Você vai receber acesso antecipado à Turma Fundadores antes da abertura
            pública.
          </Text>
          <Text style={emailStyles.text}>Sistema é o que sobra quando a motivação acaba.</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default WaitlistConfirmation;
