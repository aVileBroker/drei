import React from 'react'

import { Text } from '../../src/Text'
import {OrbitControls} from '../../src/OrbitControls'
import { Canvas, useFrame } from 'react-three-fiber'
import {EffectComposer, Bloom, SSAO} from '@react-three/postprocessing';
import {BlendFunction, KernelSize} from 'postprocessing';

export default {
  title: 'Abstractions/Text',
  component: Text,
  decorators: [(storyFn) => (
    <Canvas
      colorManagement
      shadowMap
      gl={{
        powerPreference: 'high-performance',
        antialias: false,
      }}
      onCreated={({gl}) => (gl.physicallyCorrectLights = true)}
      // potentially need to disable for production because of double render useSubscribe.
      concurrent={process.env.NODE_ENV !== 'development'}
    >
     {storyFn()}
     <OrbitControls />
    </Canvas>
  )],
}

function TextOutlineSceneTEST() {
  const ref = React.useRef(null);

  useFrame(({clock, camera}) => {
    camera.position.z = 2;

    const scale = Math.abs(Math.sin(clock.getElapsedTime() * 0.35)) + 0.1;
    ref.current.scale.x = scale;
    ref.current.scale.y = scale;
    ref.current.scale.z = scale;
  })

  return (
    <>
      <group ref={ref}>
        <Text
          color={'#ffffff'}
          fontSize={0.14}
          maxWidth={2}
          font="https://rawcdn.githack.com/google/fonts/3b179b729ac3306ab2a249d848d94ff08b90a0af/apache/robotoslab/static/RobotoSlab-Black.ttf"
          outlineWidth={0.016}
          outlineColor="#000000"
        >
          SCSCSCSCSC
        </Text>
        <Text
          color={'#ffffff'}
          fontSize={0.14}
          maxWidth={2}
          font="https://rawcdn.githack.com/google/fonts/3b179b729ac3306ab2a249d848d94ff08b90a0af/apache/robotoslab/static/RobotoSlab-Black.ttf"
          outlineWidth={0.016}
          outlineColor="#000000"
          position-y={1}
        >
          CHANNEL
        </Text>
        <Text
          color={'#ffffff'}
          fontSize={0.14}
          maxWidth={2}
          font="https://rawcdn.githack.com/google/fonts/3b179b729ac3306ab2a249d848d94ff08b90a0af/apache/robotoslab/static/RobotoSlab-Black.ttf"
          outlineWidth={0.016}
          outlineColor="#000000"
          position-y={-1}
        >
          Holy Strike
        </Text>
      </group>

      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.SCREEN}
          luminanceThreshold={0.7}
          intensity={0.4}
          kernelSize={KernelSize.SMALL}
          luminanceSmoothing={0.2}
          height={640}
        />
        <SSAO />
      </EffectComposer>
    </>
  )
}

export const TextOutlineStTEST = () => <TextOutlineSceneTEST />
TextOutlineStTEST.storyName = 'Outline TEST'
