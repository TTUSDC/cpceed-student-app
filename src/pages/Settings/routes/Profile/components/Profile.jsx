// @flow

// Replace form inputs with TextField
import React from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

type Props = {
  handleSubmit: Function,
  proErr: string,
  waiting: boolean,
  name: string,
};

type State = {
  name: string
};

class Profile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { name } = this.props;
    this.state = { name };
  }

  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event: any) => {
    // This prevents a '?' from being appended to the URL
    event.preventDefault();
    const { name, handleSubmit } = this.props;
    const { name: StateName } = this.state;

    if (name !== StateName) {
      handleSubmit({
        name: StateName,
      });
    }
  }

  render() {
    const { proErr, waiting } = this.props;
    const { name } = this.state;

    let errMessage = null;
    if (proErr !== '') {
      errMessage = (
        <span style={{ color: 'red' }}>
          {proErr}
        </span>
      );
    }

    let passHandleSubmit = this.handleSubmit;
    if (waiting === true) {
      passHandleSubmit = null;
    }

    return (
      <Box
        flex
        align='center'
        size={{ width: 'full' }}
      >
        <Heading tag='h2'>
          Personal Information
        </Heading>
        <Form
          pad='medium'
          plain={false}
          onSubmit={passHandleSubmit}
        >
          <fieldset>
            <FormField label='Screen Name'>
              <input
                name='name'
                type='text'
                value={name}
                onChange={this.handleInputChange}
              />
            </FormField>
            {errMessage}
          </fieldset>
          <Footer size='small'>
            <Button
              label='Change Information'
              type='submit'
              primary
              onClick={passHandleSubmit}
            />
          </Footer>
        </Form>
      </Box>
    );
  }
}

export default Profile;
