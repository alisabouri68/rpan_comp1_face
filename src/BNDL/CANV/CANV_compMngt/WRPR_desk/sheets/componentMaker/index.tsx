import { FC, useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import lodash from 'lodash'

// --- Local Imports & API ---
import AbsMan from 'RACT/RACT_absMan'
import Splash, { SplashRef } from 'COMP/RCMP_splash'
import data from '../../data/compRegCtrl.json'
import { DynaMan } from 'RACT/RACT_dynaMan_V00.04'
// --- UI Components & Icons ---

import { setMode, setSchema } from 'RDUX/env/SpkSlice'

// =================================================================
// --- 1. Type Definitions & Interfaces ---
// =================================================================

// =================================================================
// --- 2. Custom Hooks for Logic Management ---
// =================================================================

/**
 * Hook to load the initial component data and set up the schema.
 */
const useComponentLoader = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = AbsMan.useAppDispatch()
  const { schema } = AbsMan.useAppSelector(state => state.spk)

  const [dimensions, setDimensions] = useState({ width: 600, height: 600 })

  useEffect(() => {
    if (data) {
      const newSchema = new AbsMan()
      if (data?.object?.schema) {
        newSchema.unserialize(data?.object?.schema)
        const width = newSchema.getValue('Dimensions', 'width') || 900
        const height = newSchema.getValue('Dimensions', 'height') || 900
        setDimensions({ width, height })
      }
      dispatch(setSchema(newSchema as any))
      DynaMan.set('ENVI_COMP', data?.object?.schema)
      dispatch(setMode('dev' as any))
    }
  }, [data])

  useEffect(() => {
    if (!schema) return

    const pageW = schema?.getValue('Dimensions', 'width'),
      pageH = schema?.getValue('Dimensions', 'height')

    if (pageW == dimensions.width && pageH == dimensions.height) return

    if (!pageW && !pageH) schema?.addPack('Dimensions', 'mVar')

    if (!pageW) {
      schema?.addField('Dimensions', 'width')
      schema?.addDimension('Dimensions', 'width', 'single', 'integer')
      schema?.value('Dimensions', 'width', dimensions.width)
    } else schema?.value('Dimensions', 'width', dimensions.width)

    if (!pageH) {
      schema?.addField('Dimensions', 'height')
      schema?.addDimension('Dimensions', 'height', 'single', 'integer')
      schema?.value('Dimensions', 'height', dimensions.height)
    } else schema?.value('Dimensions', 'height', dimensions.height)

    dispatch(setSchema(lodash.cloneDeep(schema) as any))
  }, [dimensions, schema])

  useEffect(() => {
    // Add curly braces to prevent implicit return
    return () => {
      dispatch(setSchema(null as any))
    }
  }, [])

  return { componentId: id, dimensions, setDimensions, data }
}

/**
 * Hook to manage all schema synchronization effects (auto-save, param updates, etc.).
 */
const useSchemaSync = (schema: AbsMan | null, componentId?: string) => {
  const dispatch = AbsMan.useAppDispatch()
  const { microChilds, bioParam } = AbsMan.useAppSelector(state => state.spk)

  // Debounced auto-save effect
  useEffect(() => {
    if (!schema || !componentId) return
    const handler = setTimeout(() => {
      // todo : auto-save
    }, 1500)
    return () => clearTimeout(handler)
  }, [schema, componentId])

  // Effect to sync bioParam changes into the schema
  useEffect(() => {
    // Guard clauses remain the same
    if (!bioParam || !schema?.NTT) return

    // Create a clone to modify
    const clone = lodash.cloneDeep(schema)

    // Apply the same logic to build the new schema structure
    for (const paramKey of Object.keys(bioParam ?? {})) {
      clone.addPack(paramKey, 'mVar')
      clone.setPack(paramKey, { title: paramKey, description: paramKey })
      for (const param of bioParam[paramKey]) {
        clone.addField(paramKey, param.name)
        clone.setField(paramKey, param.name, {
          title: param.name,
          description: param.name
        })
        clone.addDimension(paramKey, param.name, param.class, param.dimension)
      }
    }

    if (!lodash.isEqual(clone.NTT, schema.NTT)) {
      dispatch(setSchema(clone as any))
    }
    // if (!bioParam || !schema) return;
    // const clone = lodash.cloneDeep(schema);
    // for (const paramKey of Object.keys(bioParam ?? {})) {
    //   clone.addPack(paramKey, "mVar");
    //   clone.setPack(paramKey, { title: paramKey, description: paramKey });
    //   for (const param of bioParam[paramKey]) {
    //     clone.addField(paramKey, param.name);
    //     clone.setField(paramKey, param.name, {
    //       title: param.name,
    //       description: param.name,
    //     });
    //     clone.addDimension(paramKey, param.name, param.class, param.dimension);
    //   }
    // }
    // dispatch(setSchema(clone as any));
  }, [bioParam, schema])

  // Effect to sync microChilds changes into the schema
  useEffect(() => {
    if (!microChilds || !schema) return
    // ... Original logic for updating schema with microChilds ...
    const clone = lodash.cloneDeep(schema)
    dispatch(setSchema(clone as any))
  }, [microChilds, schema])
}

// =================================================================
// --- 3. Separated UI Components ---
// =================================================================

// =================================================================
// --- 4. Main Orchestrator Component ---
// =================================================================

const ComponentMaker: FC = () => {
  const dispatch = AbsMan.useAppDispatch()
  const { schema } = AbsMan.useAppSelector(state => state.spk)

  const { componentId, dimensions, setDimensions, data } = useComponentLoader()

  // Activate the synchronization and auto-saving logic
  useSchemaSync(schema, componentId)

  const splashRef = useRef<SplashRef>(null)

  const handleDimensionChange = (dim: 'width' | 'height', value: number) => {
    setDimensions(prev => ({ ...prev, [dim]: value }))
  }

  if (!schema) {
    return (
      <div className='p-8 text-center text-gray-500'>Loading Component...</div>
    )
  }

  return (
    <div className='flex flex-col h-auto'>
      <Splash
        ref={splashRef}
        geometric={dimensions}
        logic={{
          data,
          schema,
          setSchema: (newSchema: any) => {
            dispatch(setSchema(newSchema))

            console.log(newSchema)
          },
          onDimensionChange: handleDimensionChange
        }}
        style={{}}
      />
    </div>
  )
}

export default ComponentMaker
