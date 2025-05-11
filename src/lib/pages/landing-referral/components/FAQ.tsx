'use client';

import { Accordion, Box, Container, Heading, Text } from '@chakra-ui/react';

interface FAQItem {
  question: string;
  answer: string;
  value: string;
}

const faqItems: FAQItem[] = [
  {
    value: 'faq-1',
    question: 'As aulas são gravadas?',
    answer:
      'Sim, todas as nossas aulas são gravadas, pois assim o aluno pode assistir mais de uma vez e não só isso, pode assistir no seu melhor horário do dia. Além é claro, de revisar a aula quantas vezes desejar!',
  },
  {
    value: 'faq-2',
    question: 'Existe comunicação com os professores?',
    answer:
      'Com certeza! A comunicação com os professores é muito importante para nós. Eles estão sempre disponíveis, de segunda-feira a sexta-feira das 09h00 às 18h00, no chat de dúvidas da plataforma e também pelo WhatsApp da área pedagógica, prontos para auxiliar e esclarecer qualquer questão que possa surgir. 📲👩‍🏫',
  },
  {
    value: 'faq-3',
    question: 'Meu filho tem TDAH, o reforço funciona pra ele?',
    answer: ` Claro! Felizmente, existem estratégias eficazes para apoiar crianças com TDAH nos estudos, como reforço positivo e um acompanhamento personalizado de acordo com suas necessidades individuais.

            É importante também envolver os pais no processo de aprendizagem, a fim de receberem as orientações pedagógicas dos professores e entenderem o desempenho escolar e comportamento dos filhos.

            Além disso, o nosso Reforço Escolar On-line pode ser uma ótima opção para crianças com TDAH, pois buscamos a personalização do estudo para cada aluno, desenvolvendo um plano de apoio personalizado para garantir que a criança receba o suporte necessário para ter sucesso na escola. 
            
            E, sendo online, como é o nosso caso do Reforço Brio Educação, a criança tende a ter menos distrações do que em uma sala de aula convencional.
            `,
  },
  {
    value: 'faq-4',
    question:
      'Como funciona o cronograma de estudos? E o cronograma de provas?',
    answer: ` O nosso cronograma é desenvolvido de acordo com as dificuldades do aluno. 

            Então, para o primeiro plano de estudos ser elaborado, o/a responsável junto com o/a estudante deve responder um formulário pedagógico nos informando sobre os conteúdos que estão sendo estudados na escola ou os que desejam ser estudados (por exemplo, de acordo com a BNCC ou ementa de Vestibulinhos). 

            No plano de estudos será disponibilizado a sugestão do dia de estudo, a matéria a ser estudada, o módulo e o nome da aula em questão, o número da lista de exercícios a ser realizada, e, caso seja necessário, uma observação sobre refazer determinada atividade. 

            O cronograma específico para as provas segue o mesmo raciocínio que o plano de estudos. No entanto, as aulas e as listas de exercícios são direcionadas de forma a realizar uma revisão dos conteúdos estudados pelo(a) estudante. Portanto, é de fundamental importância a solicitação antecipada desse tipo de cronograma, sendo no mínimo 15 dias antes do início das provas. Dessa forma, a véspera da prova não será conturbada para o estudante, garantindo a compreensão e o aprendizado mais assertivos.
            `,
  },
  {
    value: 'faq-5',
    question:
      'Os pais recebem algum relatório para acompanhamento da evolução do filho?',
    answer: ` Sim, após completar um mês de estudo no curso, ou seja, quatro semanas, o/a responsável pode solicitar o envio do relatório de desempenho. Neste terá as notas das listas de exercícios que foram indicadas em seu cronograma de estudos para cada matéria estudada ao longo do tempo. 

        Além disso, um gráfico mostrando a evolução do(a) estudante será disponibilizado, junto com a quantidade de listas de exercícios realizadas ou não, e, por fim, a porcentagem de participação do(a) estudante nas atividades propostas nesse intervalo de tempo.

        *Disponível apenas para o Plano Completo.
        `,
  },
  {
    value: 'faq-6',
    question:
      'É possível meu filho estudar para uma prova de vestibulinho (etec, militar…)?',
    answer: `Claro! As informações a serem preenchidas no nosso formulário pedagógico para a elaboração do primeiro cronograma de estudos e as suas atualizações podem ser destinadas a conteúdos específicos que são cobrados em determinadas provas. Portanto, a única exigência é que seja passado para a nossa equipe pedagógica o conteúdo a ser estudado.`,
  },
];

export const FAQ = () => {
  return (
    <Box py={16} bg="white">
      <Container maxW="container.lg">
        <Heading
          as="h2"
          fontSize={{ base: '2xl', md: '3xl' }}
          mb={8}
          textAlign="center"
        >
          Perguntas mais frequentes
        </Heading>

        <Accordion.Root>
          {faqItems.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.ItemTrigger>
                <Box flex="1" textAlign="left">
                  <Text fontWeight="semibold" color="black">
                    {item.question}
                  </Text>
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  <Text color="gray.800" whiteSpace="pre-line">
                    {item.answer}
                  </Text>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </Box>
  );
};
