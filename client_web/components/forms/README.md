# Dynamic Form component

- Import component
```
import DynamicForm from "@/components/forms/Form.vue";
```

- In template

```
<dynamic-form
    :config="config"
    @update:config="config = $event"
    @validate="methodToCallIfFormValid()"
/>
```

- Configuation in data()
```
config: {
  title: "Title",
  
  // Width of the form / 12
  width: 4,
  
  // Label for the button
  validate: "Validate"
  
  // Error messages
  message: {
    type: null,
    text: null,
    duration: 5000
  },
  
  // Icon next to the title
  icon: mdi-account-circle
  
  // Logo on top of form
  image:
    "https://img.icons8.com/plasticine/2x/telegram-app.png",
  
  // array of inputs components
  components: [
    {
      // model of the input
      model: null,
      
      // name of the model to retrieve datas more easily
      modelName: "name",
      
      // name of the component
      name: "inputs-text-field",
      
      // directive of the component
      directive: "config",
      
      // props of the components
      options: {
        dark: true,
        filled: true,
        shaped: true,
        autocomplete: false,
        required: true,
        label: "Name",
        counter: 0,
        rules: [
          v => !!v || "Name required",
          v =>
            (v && v.length > 4) ||
            "Name must be superior than 4 characters"
        ]
      }
    }
  ]
}

```

- Email input component config example
```
  // Email input component config exemple
    {
      // model of the input
      model: null,
      
      // name of the model to retrieve datas more easily
      modelName: "email",
      
      // name of the component
      name: "inputs-text-field",
      
      // directive of the component
      directive: "config",
      
      // props of the components
      options: {
        dark: false,
        light: true,
        filled: true,
        dense: false,
        shaped: true,
        outlined: true,
        clearable: true,
        autocomplete: false,
        required: true,
        label: "Email",
        counter: 0,
        rules: [
          v => !!v || "Email required",
          v => /.+@.+\.+./.test(v) || "Invalid Email address",
          v =>
            (v && v.length > 4) ||
            "Email must be superior than 4 characters"
        ]
      }
    }
```