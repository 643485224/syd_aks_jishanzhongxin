export let webSuperviseRoute = [{
    path: 'webSuperviseDrugs', //药品监管
    name: 'webSuperviseDrugs',
    component: () => import('../views/webSupervise/webSuperviseDrugs/webSuperviseDrugs.vue'),
  },
  {
    path: 'webSuperviseEnterprise', //企业监管
    name: 'webSuperviseEnterprise',
    component: () => import('../views/webSupervise/webSuperviseEnterprise/webSuperviseEnterprise.vue'),
  },
  {
    path: 'webSuperviseMedicalEquipment', //药械监管
    name: 'webSuperviseMedicalEquipment',
    component: () => import('../views/webSupervise/webSuperviseMedicalEquipment/webSuperviseMedicalEquipment.vue'),
  },
  {
    path: 'webSuperviseEnterpriseInformation', //药械监管企业信息
    name: 'webSuperviseEnterpriseInformation',
    component: () => import('../views/webSupervise/webSuperviseEnterpriseInformation/webSuperviseEnterpriseInformation.vue'),
  },
  {
    path: 'webSuperviseEnterpriseQualification', //药械监管企业资质
    name: 'webSuperviseEnterpriseQualification',
    component: () => import('../views/webSupervise/webSuperviseEnterpriseQualification/webSuperviseEnterpriseQualification.vue'),
  },
  {
    path: 'webSuperviseProductInformation', //相关订单
    name: 'webSuperviseProductInformation',
    component: () => import('../views/webSupervise/webSuperviseProductInformation/webSuperviseProductInformation.vue'),
  },
  {
    path: 'webSuperviseProductInformationDetails', //相关订单->详情
    name: 'webSuperviseProductInformationDetails',
    component: () => import('../views/webSupervise/webSuperviseProductInformation/webSuperviseProductInformationDetails/webSuperviseProductInformationDetails.vue'),
  },
  {
    path: 'webSuperviseProductInformationLogistics', //相关订单->物流
    name: 'webSuperviseProductInformationLogistics',
    component: () => import('../views/webSupervise/webSuperviseProductInformation/webSuperviseProductInformationLogistics/webSuperviseProductInformationLogistics.vue'),
  },
  {
    path: 'webSuperviseCompanyProfile', //药品商品信息
    name: 'webSuperviseCompanyProfile',
    component: () => import('../views/webSupervise/webSuperviseCompanyProfile/webSuperviseCompanyProfile.vue'),
  },
  {
    path: 'webSuperviseCommodity', //药品商品信息
    name: 'webSuperviseCommodity',
    component: () => import('../views/webSupervise/webSuperviseCommodity/webSuperviseCommodity.vue'),
  },
]
