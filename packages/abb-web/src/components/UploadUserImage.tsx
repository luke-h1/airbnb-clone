import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import { Field } from 'formik';

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const thumbsContainer = {
  display: 'flex',
  marginTop: 16,
};

const thumbStyle = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const errorStyle = {
  color: '#c45e5e',
  fontSize: '0.75rem',
};

const UploadUserImage = () => {
  const [preview, setPreview] = useState();
  const [errors, setErrors] = useState();
  const onDrop = useCallback(async ([file]) => {
    if (file) {
      // @ts-ignore
      setPreview(URL.createObjectURL(file));
    } else {
      setErrors(
        // @ts-ignore
        'Something went wrong. Check file type and size (max. 2 MB)',
      );
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxSize: 2048000,
  });

  const thumb = (
    <div style={thumbStyle}>
      <div style={thumbInner}>
        <img src={preview} style={img} alt="file" />
      </div>
    </div>
  );

  return (
    <Field name="image" placeholder="image" label="image">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drop file here, or click to select the file</p>
        )}
        {preview && <aside style={thumbsContainer}>{thumb}</aside>}
        {errors && <span style={errorStyle}>{errors}</span>}
      </Container>
    </Field>
  );
};

export default UploadUserImage;
