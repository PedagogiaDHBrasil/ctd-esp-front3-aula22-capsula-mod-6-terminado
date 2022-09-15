import React from "react";
import { NextPage } from "next";
// Importamos Head para poder agregar Google Fonts
import Head from "next/head";
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
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { countries } from "countries-list";
import Radio from "@mui/material/Radio";
import Container from "@mui/material/Container";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useRouter } from "next/router";
// Importamos as dependências do React Hook Form
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { defaultLocale, TEXTS_BY_LANGUAGE } from "../locale/constants";

const countriesValues = Object.values(countries);
const countriesNames = countriesValues.map((country) => country.name);

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
          {/* Criamos a lista de opções que vai dentro do
               suspenso */}
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

const Contacto: NextPage = () => {
  const { locale } = useRouter();

  const { CONTACT } =
    TEXTS_BY_LANGUAGE[locale as keyof typeof TEXTS_BY_LANGUAGE] ??
    TEXTS_BY_LANGUAGE[defaultLocale];

  // Criamos o esquema para realizar nossas validações.
  // No caso de validações inválidas, atribuímos uma mensagem de erro
  // personalizado
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
      // 1 elemento e segundo, que o elemento tem uma das opções possíveis.
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

  // Usamos o gancho useForm para acessar "control", "handleSubmit"
  // e "erros", passando para ele o resolvedor com o esquema que criamos
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Criamos um callback que será executado quando o formulário for enviado
  const onSubmit = (data) => alert(JSON.stringify(data));

  // Usando useFieldArray, obtemos a propriedade "fields" que
  // conterá nossos elementos. Além disso, obtemos os métodos para
  // adiciona e remove elementos.
  const { fields, append, remove } = useFieldArray({
    name: "categories",
    control,
  });

  // Criamos os callbacks para adicionar e remover itens
  const addItem = () => append({ value: "" });
  const removeItem = (index: number) => remove(index);

  return (
    <>
      {/* Adicionamos o Head e vinculamos o Google Fonts para poder usar os ícones */}
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
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
                      {errors.country && (
                        <small>{errors.country.message}</small>
                      )}
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
                      {errors.question && (
                        <small>{errors.question.message}</small>
                      )}
                    </>
                  )}
                />
              </FormGroup>
              {/* Adicionamos nosso novo campo dinâmico */}
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
                {errors.categories && (
                  <small>{errors.categories.message}</small>
                )}
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
              {/* Adicionamos o tipo "submit" ao botão para garantir
                 envie o formulário */}
              <Button variant="contained" sx={{ width: 1 }} type="submit">
                {CONTACT.SEND_BUTTON}
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  );
};
export default Contacto;
