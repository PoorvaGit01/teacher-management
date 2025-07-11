"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Teacher } from '@/constants/types'
import { teachers as initialTeachers } from '@/constants/teachersData'
import {format} from 'date-fns'

interface TeacherContextType {
  teachers: Teacher[]
  getTeacherById: (id: string) => Teacher | undefined
  updateTeacher: (id: string, data: Partial<Teacher>) => void
  deleteTeacher: (id: string) => void
  addTeacher: (teacher: Teacher) => void
  resetTeachers: () => void
  lastUpdated: string | null
}

type TeacherAction = 
  | { type: 'UPDATE_TEACHER'; payload: { id: string; data: Partial<Teacher> } }
  | { type: 'DELETE_TEACHER'; payload: { id: string } }
  | { type: 'ADD_TEACHER'; payload: Teacher }
  | { type: 'RESET_TEACHERS' }

interface TeacherState {
  teachers: Teacher[]
  lastUpdated: string | null
}

const teacherReducer = (state: TeacherState, action: TeacherAction): TeacherState => {
  switch (action.type) {
    case 'UPDATE_TEACHER':
      return {
        ...state,
        teachers: state.teachers.map(teacher =>
          teacher.id === action.payload.id
            ? { ...teacher, ...action.payload.data }
            : teacher
        ),
        lastUpdated: format(new Date(), 'dd/MM/yyyy')
      }
    
    case 'DELETE_TEACHER':
      return {
        ...state,
        teachers: state.teachers.filter(teacher => teacher.id !== action.payload.id),
        lastUpdated: format(new Date(), 'dd/MM/yyyy')
      }
    
    case 'ADD_TEACHER':
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
        lastUpdated: format(new Date(), 'dd/MM/yyyy')
      }
    
    case 'RESET_TEACHERS':
      return {
        teachers: initialTeachers,
        lastUpdated: null
      }
    
    default:
      return state
  }
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined)

export const TeacherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(teacherReducer, {
    teachers: initialTeachers,
    lastUpdated: null
  })

  const getTeacherById = (id: string): Teacher | undefined => {
    return state.teachers.find(teacher => teacher.id === id)
  }

  const updateTeacher = (id: string, data: Partial<Teacher>) => {
    dispatch({ type: 'UPDATE_TEACHER', payload: { id, data } })
  }

  const deleteTeacher = (id: string) => {
    dispatch({ type: 'DELETE_TEACHER', payload: { id } })
  }

  const addTeacher = (teacher: Teacher) => {
    dispatch({ type: 'ADD_TEACHER', payload: teacher })
  }

  const resetTeachers = () => {
    dispatch({ type: 'RESET_TEACHERS' })
  }

  const contextValue: TeacherContextType = {
    teachers: state.teachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher,
    addTeacher,
    resetTeachers,
    lastUpdated: state.lastUpdated
  }

  return (
    <TeacherContext.Provider value={contextValue}>
      {children}
    </TeacherContext.Provider>
  )
}

export const useTeacherContext = (): TeacherContextType => {
  const context = useContext(TeacherContext)
  if (context === undefined) {
    throw new Error('useTeacherContext must be used within a TeacherProvider')
  }
  return context
}

export const useTeacher = (teacherId: string) => {
  const { getTeacherById, updateTeacher: updateTeacherContext, deleteTeacher: deleteTeacherContext } = useTeacherContext()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const teacher = getTeacherById(teacherId)

  const updateTeacher = async (data: Partial<Teacher>): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (!teacher) {
        throw new Error('Teacher not found')
      }

      updateTeacherContext(teacherId, data)
      return true
    } catch (err) {
      setError('Failed to update teacher')
      console.error('Update error:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const deleteTeacher = async (): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (!teacher) {
        throw new Error('Teacher not found')
      }

      deleteTeacherContext(teacherId)
      return true
    } catch (err) {
      setError('Failed to delete teacher')
      console.error('Delete error:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    teacher,
    loading,
    error,
    updateTeacher,
    deleteTeacher,
  }
}

export const useTeachers = () => {
  const { teachers } = useTeacherContext()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const searchTeachers = (query: string): Teacher[] => {
    if (!query.trim()) return teachers
    
    const lowercaseQuery = query.toLowerCase()
    return teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(lowercaseQuery) ||
      teacher.email.toLowerCase().includes(lowercaseQuery) ||
      teacher.experties.some(exp => exp.toLowerCase().includes(lowercaseQuery)) ||
      teacher.qualifications.some(qual => qual.toLowerCase().includes(lowercaseQuery))
    )
  }

  const filterByStatus = (status: 'Active' | 'Inactive' | 'All'): Teacher[] => {
    if (status === 'All') return teachers
    return teachers.filter(teacher => teacher.status === status)
  }

  const filterByExperience = (minYears: number): Teacher[] => {
    return teachers.filter(teacher => teacher.experience >= minYears)
  }

  const getTeachersBySubject = (subject: string): Teacher[] => {
    return teachers.filter(teacher =>
      teacher.experties.some(exp => exp.toLowerCase().includes(subject.toLowerCase()))
    )
  }

  return {
    teachers,
    loading,
    error,
    searchTeachers,
    filterByStatus,
    filterByExperience,
    getTeachersBySubject,
  }
}