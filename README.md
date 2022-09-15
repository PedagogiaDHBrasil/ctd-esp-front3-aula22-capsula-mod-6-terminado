# Especialização em Frontend III - Semana 8 - Aula 22

## Módulo Cápsula 4 - Material UI

Para este exercício, continuaremos trabalhando no projeto "Loja Gratuita", adicionando uma nova seção "Contacto" para que as pessoas possam enviar suas preocupações. Para fazer isso, vamos construir um formulário usando Material UI. Usando a base de código, criaremos um arquivo _contact.tsx_ dentro da pasta _pages_.

Lá, iniciaremos a construção do formulário, que conterá os seguintes campos:

- Nome, que estará na entrada do tipo de texto
- Email, que também será uma entrada mas deste tipo
- Country, que será um componente do tipo Select que conterá uma lista de todos os países. Para obter esta lista, contaremos com a biblioteca **countries_list**.
- Gênero, que será uma entrada do tipo rádio que permitirá escolher uma das opções disponíveis.
- A seção onde a pessoa pode escrever a consulta, que será uma área de texto
- E, por fim, uma caixa de seleção digite a entrada para aceitar os termos e condições.

Para finalizar o formulário, teremos um botão que nos permitirá enviar a consulta (nesta cápsula não é necessário implementar esta funcionalidade).

Também aproveitaremos a funcionalidade i18n já implementada para tornar os textos desta página dinâmicos com base no idioma selecionado.

Para começar, vamos importar as dependências e outros utilitários que usaremos neste componente:

```jsx
import React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { countries } from "countries-list";
import Radio from "@mui/material/Radio";
import Container from "@mui/material/Container";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useRouter } from "next/router";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";
```

Antes de começar a trabalhar com o componente, vamos obter a lista de países que usaremos posteriormente:

```javascript
// Obtemos a lista de países e dentro dela o nome deles
// para exibir dentro do Select
const countriesValues = Object.values(countries);
const countriesNames = countriesValues.map((country) => country.name);
```

Agora, criamos nosso componente e aproveitamos para obter o idioma e os textos usando _useRouter_ e as constantes armazenadas no projeto:

```jsx
const Contacto: NextPage = () => {
  // Obtemos a linguagem usando useRoute
  const { locale } = useRouter();

  // Obtemos os textos usando o idioma selecionado
  const { CONTACT } =
    TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
    TEXTS_BY_LANGUAGE[defaultLocale];

  //.....
```

Por sua vez, para armazenar o país selecionado no menu suspenso, usaremos _useState_. Em seguida, criamos o estado e uma função para atualizar o valor quando a pessoa seleciona um novo país:

```jsx
// Por enquanto armazenamos o valor escolhido dentro de um estado
const [selectedCountry, setCountry] = React.useState("");

// Criamos uma função para atualizar o país selecionado
const handleChange = (event: SelectChangeEvent<string>) => {
  setCountry(event.target.value);
};
```

Agora sim, nós construímos nosso formulário usando Material UI:

```jsx
// Criamos nosso formulário de contato usando o Material UI
return (
  // Usamos Container para centralizar o formulário dentro da página
  <Container maxWidth="sm">
    {/* Usando Box criamos o container para o formulário */}
    <Box sx={{ maxWidth: 500, marginTop: 3 }}>
      {/* Usamos papel para criar o efeito de relevo */}
      <Paper
        elevation={4}
        sx={{ p: "32px", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
          {CONTACT.TITLE}
        </Typography>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label={CONTACT.FIELDS.NAME}
            variant="outlined"
            sx={{ width: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="email"
            id="outlined-basic"
            label={CONTACT.FIELDS.EMAIL}
            variant="outlined"
            sx={{ width: 1 }}
          />
        </Grid>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {CONTACT.FIELDS.COUNTRY}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCountry}
            label={CONTACT.FIELDS.COUNTRY}
            onChange={handleChange}
          >
            {/* Para cada país da nossa lista, criamos um item dentro do 
                  dropdown */}
            {countriesNames.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            {CONTACT.FIELDS.GENDER}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label={CONTACT.FIELDS.FEMALE}
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label={CONTACT.FIELDS.MALE}
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label={CONTACT.FIELDS.OTHER}
            />
          </RadioGroup>
        </FormControl>

        <FormGroup>
          <InputLabel id="demo-simple-select-label">
            {CONTACT.FIELDS.QUESTION}
          </InputLabel>
          <TextareaAutosize aria-label="minimum height" minRows={10} />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={CONTACT.FIELDS.TYCS}
          />
        </FormGroup>

        <Button variant="contained" sx={{ width: 1 }}>
          {CONTACT.SEND_BUTTON}
        </Button>
      </Paper>
    </Box>
  </Container>
);
```

Desta forma, se entrarmos na seção correspondente, veremos nosso formulário finalizado

Exercício terminado em [ctd-esp-front3-aula22-capsula-mod-4-terminado](https://github.com/PedagogiaDHBrasil/ctd-esp-front3-aula22-capsula-mod-4-terminado)

## Capsula Modulo 5 - React Hook Form

Nesta cápsula vamos adicionar o React Hook Form ao formulário de contato do site Loja Gratuito, integrando esta biblioteca com o Material UI. Para isso, usaremos as diferentes ferramentas que o React Hook Form nos fornece para armazenar os valores, realizar as validações e, por fim, enviar o formulário.

Dentro do arquivo _contact.tsx_ encontrado na pasta **pages**, vamos importar as dependências que usaremos para concluir este exercício.

```javascript
// Importamos as dependências do React Hook Form
import {
  useForm,
  Controller,
  UseControllerProps,
  useController,
} from "react-hook-form";
// Importamos o resolvedor para adicionar as validações
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
```

Agora que temos as dependências, podemos ver que as duas primeiras entradas (Nome e Email), usam o mesmo componente. Como precisamos controlá-los usando o Controller, vamos criar um componente "wrapper" que podemos reutilizar em ambos os casos:

```jsx
// Criamos um Wrapper para poder reutilizar o componente TextField em todo
// do formulário
const TextFieldWrapper = ({
  control,
  name,
  defaultValue,
  rules,
  ...props
}: UseControllerProps<TextFieldProps>) => {
  const { field } = useController({
    control,
    name,
    defaultValue,
    rules,
  });

  return <TextField {...props} {...field} />;
};
```

O próximo passo será criar o esquema de validação para o nosso formulário. Para fazer isso, usaremos Yup:

```jsx
// Criamos o esquema para realizar nossas validações.
// No caso de validações inválidas, atribuímos uma mensagem de erro
// personalizado que trazemos com base no idioma selecionado.
const schema = yup
  .object({
    name: yup.string().required(CONTACT.ERRORS.NAME),
    email: yup.string().required(CONTACT.ERRORS.EMAIL),
    country: yup
      .string()
      .oneOf(countriesNames)
      .required(CONTACT.ERRORS.COUNTRY),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"])
      .required(CONTACT.ERRORS.GENDER),
    question: yup.string().min(10).required(CONTACT.ERRORS.QUESTION),
    tycs: yup
      .boolean()
      .test("OK", CONTACT.ERRORS.TYCS, (value) => value === true),
  })
  .required();
```

Agora que definimos nosso esquema, vamos usar o hook useForm para obter as variáveis ​​e métodos que usaremos para concluir a atividade:

```jsx
// Usamos o hook useForm para acessar "control", "handleSubmit"
// e "errors", passando o resolvedor com o esquema que criamos anteriormente.
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(schema),
});

// Criamos um callback que será executado quando o formulário for enviado
const onSubmit = (data) => alert(JSON.stringify(data));
```

Com isso, estamos prontos para modificar nosso formulário:

```jsx
return (
  <Container maxWidth="sm">
    <Box sx={{ maxWidth: 500, marginTop: 3 }}>
      <Paper
        elevation={4}
        sx={{ p: "32px", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: 24 }}>
          {CONTACT.TITLE}
        </Typography>
        {/* Envolvemos nossos campos na tag de formulário e passamos o retorno de chamada
              para o evento onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12}>
            <TextFieldWrapper
              name="name"
              id="outlined-basic"
              label={CONTACT.FIELDS.NAME}
              variant="outlined"
              sx={{ width: 1 }}
              control={control}
              // Passamos esses campos como props para
              // veja a mensagem de erro
              error={errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldWrapper
              name="email"
              type="email"
              id="outlined-basic"
              label={CONTACT.FIELDS.EMAIL}
              variant="outlined"
              sx={{ width: 1 }}
              control={control}
              // Passamos esses campos como props para
              // veja a mensagem de erro
              error={errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          {/* Passamos o erro para o componente que controla este campo */}
          <FormControl fullWidth error={errors.country}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel id="demo-simple-select-label">
                    {CONTACT.FIELDS.COUNTRY}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={CONTACT.FIELDS.COUNTRY}
                    {...field}
                  >
                    {countriesNames.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* Aqui criamos uma mensagem de erro e a exibimos se aplicável */}
                  {errors.country && <small>{errors.country.message}</small>}
                </>
              )}
            />
          </FormControl>

          <FormLabel id="demo-radio-buttons-group-label">
            {CONTACT.FIELDS.GENDER}
          </FormLabel>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                {...field}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={CONTACT.FIELDS.FEMALE}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={CONTACT.FIELDS.MALE}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label={CONTACT.FIELDS.OTHER}
                />
                {/* Aqui criamos uma mensagem de erro e a exibimos se aplicável */}
                {errors.gender && <small>{errors.gender.message}</small>}
              </RadioGroup>
            )}
          />

          <FormGroup>
            <InputLabel id="demo-simple-select-label">
              {CONTACT.FIELDS.QUESTION}
            </InputLabel>
            <Controller
              name="question"
              control={control}
              render={({ field }) => (
                <>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={10}
                    {...field}
                  />
                  {/* Aqui criamos uma mensagem de erro e a exibimos se aplicável */}
                  {errors.question && <small>{errors.question.message}</small>}
                </>
              )}
            />
          </FormGroup>

          <FormGroup>
            <Controller
              name="tycs"
              control={control}
              render={({ field }) => (
                <>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={CONTACT.FIELDS.TYCS}
                    {...field}
                  />
                  {/* Aqui criamos uma mensagem de erro e a exibimos se aplicável */}
                  {errors.tycs && <small>{errors.tycs.message}</small>}
                </>
              )}
            />
          </FormGroup>
          {/* Adicionamos o tipo "enviar" ao botão para garantir
              envie o formulário */}
          <Button variant="contained" sx={{ width: 1 }} type="submit">
            {CONTACT.SEND_BUTTON}
          </Button>
        </form>
      </Paper>
    </Box>
  </Container>
);
```

Uma vez concluído, poderemos ver como as validações são aplicadas se tentarmos enviá-lo com um campo inválido. Por outro lado, se todos os campos estiverem corretos, veremos o alerta com as informações inseridas.

Exercício terminado em [ctd-esp-front3-aula22-capsula-mod-5-terminado](https://github.com/PedagogiaDHBrasil/ctd-esp-front3-aula22-capsula-mod-5-terminado)

## Capsula Modulo 6 - React Hook Form - Forms Avançado

Nesta última cápsula vamos adicionar um campo dinâmico ao nosso formulário, que nos permitirá escolher uma ou mais categorias associadas à nossa consulta. Para fazer isso, usaremos o hook useFieldArray que já conhecemos. Além disso, adicionaremos a validação correspondente para este novo campo.

As categorias possíveis estão dentro de um array de elementos, então cada item do campo dinâmico se comportará como um Select.

Em primeiro lugar, adicionamos as dependências que vamos usar no arquivo _contact.tsx_

```jsx
// Importamos Head para poder adicionar Google Fonts
import Head from "next/head";
//...
import {
  useForm,
  Controller,
  UseControllerProps,
  useController,
  // Importamos o hook useFieldArray
  useFieldArray,
} from "react-hook-form";
// Importamos o resolvedor para adicionar as validações
// Importamos o componente Icon que usaremos em nosso
// campo dinâmico
import Icon from "@mui/material/Icon";
```

Agora, já que vamos reutilizar nossa entrada em cada elemento criado, vamos criar um componente que podemos reutilizar facilmente:

```jsx
// Criamos um Wrapper para poder reutilizá-lo em cada elemento criado dentro do campo dinâmico
const SelectWrapper = ({
  control,
  name,
  options = [],
  removeItem,
  errors,
  ...props
}: UseControllerProps<SelectProps>) => {
  // Em vez disso, usamos o hook useController
  // do componente
  const { field } = useController({
    control,
    name,
  });

  return (
    <>
      <Box
        key={field.id}
        gap={2}
        sx={{
          marginBottom: 2,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{ minWidth: 200 }}
          {...props}
          {...field}
        >
          {/* Creamos el listado de opciones que va dentro del
              dropdown */}
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {/* Adicionamos um botão ao lado da entrada para poder remover o elemento */}
        <Icon color="primary" onClick={removeItem}>
          remove_circle
        </Icon>
      </Box>
      {/* Adicionamos uma mensagem de erro caso haja uma */}
      {errors && <small>{errors.value.message}</small>}
    </>
  );
};
```

Por sua vez, vamos atualizar nosso _schema_ de validações, adicionando este novo campo:

```jsx
const schema = yup
  .object({
    name: yup.string().required(CONTACT.ERRORS.NAME),
    email: yup.string().required(CONTACT.ERRORS.EMAIL),
    country: yup
      .string()
      .oneOf(countriesNames)
      .required(CONTACT.ERRORS.COUNTRY),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"])
      .required(CONTACT.ERRORS.GENDER),
    question: yup.string().min(10).required(CONTACT.ERRORS.QUESTION),
    tycs: yup
      .boolean()
      .test("OK", CONTACT.ERRORS.TYCS, (value) => value === true),
    // Adicionamos a validação correspondente para o novo campo.
    // Vamos realizar duas validações: primeiro, que pelo menos ele foi criado
    // 1 elemento e segundo, que cada elemento tem uma das opções possíveis.
    categories: yup
      .array()
      .of(
        yup.object({
          value: yup
            .string()
            .oneOf(
              CONTACT.FIELDS.CATEGORIES_OPTIONS,
              CONTACT.ERRORS.CATEGORIES
            ),
        })
      )
      .min(1, CONTACT.ERRORS.CATEGORIES),
  })
  .required();
```

Com isso, estamos prontos para criar nosso campo dinâmico. O primeiro passo é usar o hook _useFieldArray_ para acessar as propriedades e métodos que precisamos:

```jsx
// Usando useFieldArray, obtemos a propriedade "fields" que
// conterá nossos elementos. Além disso, obtemos os métodos para
// adiciona e remove elementos.
const { fields, append, remove } = useFieldArray({
  name: "categories",
  control,
});
```

Por sua vez, vamos criar os callbacks que executaremos ao adicionar/remover elementos

```jsx
// Criamos os callbacks para adicionar e remover itens
const addItem = () => append({ value: "" });
const removeItem = (index: number) => remove(index);
```

Por fim, criamos nosso novo campo dinâmico dentro do formulário:

```jsx
{
  /* Adicionamos nosso novo campo dinâmico */
}
<FormGroup>
  <InputLabel id="demo-simple-select-label">
    {CONTACT.FIELDS.CATEGORIES}
  </InputLabel>
  {/* Através deste ícone podemos criar novos elementos */}
  <Icon
    color="primary"
    onClick={addItem}
    sx={{ marginBottom: 2, marginTop: 2 }}
  >
    add_circle
  </Icon>
  {/* Percorremos a matriz de elementos criadores e para cada
      criamos um Select usando o wrapper que criamos
      anteriormente */}
  {fields.map((field, index) => (
    <SelectWrapper
      key={field.id}
      name={`categories.${index}.value`}
      placeholder="Nombre del perfil"
      control={control}
      options={CONTACT.FIELDS.CATEGORIES_OPTIONS}
      // Aqui verificamos se esse elemento específico tem um erro
      // e passamos para que a mensagem possa ser exibida
      errors={errors.categories?.[index]}
      // Passamos o callback que vai no botão remover
      removeItem={() => removeItem(index)}
    />
  ))}
  {/* Aqui criamos uma mensagem de erro (para todo o campo) e a exibimos, se aplicável */}
  {errors.categories && <small>{errors.categories.message}</small>}
</FormGroup>;
```

Com isso, podemos verificar como temos a possibilidade de adicionar/remover elementos e selecionar as opções. Além disso, podemos testar as diferentes validações, bem como verificar o envio do formulário se todos os dados estão corretos.

Exercício terminado em [ctd-esp-front3-aula22-capsula-mod-6-terminado](https://github.com/PedagogiaDHBrasil/ctd-esp-front3-aula22-capsula-mod-6-terminado)
