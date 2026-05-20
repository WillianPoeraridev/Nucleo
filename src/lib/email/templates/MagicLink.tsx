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

interface MagicLinkProps {
  name: string;
  url: string;
}

/**
 * Template do magic link. O plugin de magic link do Better-Auth ainda não
 * está plugado (entra na S0.6 ou junto da landing). Template já pronto.
 */
export function MagicLink({ name, url }: MagicLinkProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Seu link de entrada no Núcleo.</Preview>
      <Body style={emailStyles.body}>
        <Container style={emailStyles.container}>
          <Text style={emailStyles.label}>Núcleo</Text>
          <Heading style={emailStyles.heading}>Entrar no Núcleo</Heading>
          <Text style={emailStyles.text}>
            Olá, <span style={emailStyles.textStrong}>{name}</span>. Use o link abaixo pra entrar.
            Válido por 15 minutos.
          </Text>
          <Button href={url} style={emailStyles.button}>
            Entrar
          </Button>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.text}>
            Se o botão não funcionar, copie e cole a URL no navegador:
          </Text>
          <Link href={url} style={emailStyles.link}>
            {url}
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

export default MagicLink;
